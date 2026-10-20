import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setUser, type AuthUser } from '@/entities/user';
import { profileService } from '@/shared/api';
import { showSuccessToast } from '@/shared/lib/toast';
import { FormFields, type FormFieldConfig } from '@/shared/ui/form-fields';
import { Button } from '@/shared/ui';
import {
  profileSchema,
  toProfileFormValues,
  toUpdateProfilePayload,
  type ProfileFormValues,
} from '../../model/schema';
import { bem } from '@/shared/lib/bem';
import styles from './ProfileForm.module.scss';

const b = bem(styles, 'profile-form');

const fields = [
  {
    name: 'firstName',
    id: 'profile-first-name',
    label: 'Имя',
    kind: 'input',
    type: 'text',
    placeholder: 'Алексей',
  },
  {
    name: 'lastName',
    id: 'profile-last-name',
    label: 'Фамилия',
    kind: 'input',
    type: 'text',
    placeholder: 'Иванов',
  },
  {
    name: 'bio',
    id: 'profile-bio',
    label: 'О себе',
    kind: 'textarea',
    placeholder: 'Frontend-разработчик, изучаю React',
  },
  {
    name: 'telegramUsername',
    id: 'profile-telegram',
    label: 'Telegram',
    kind: 'input',
    type: 'text',
    placeholder: 'username',
    hint: 'Только username, без символа @',
  },
  {
    name: 'githubUrl',
    id: 'profile-github',
    label: 'GitHub',
    kind: 'input',
    type: 'url',
    placeholder: 'https://github.com/username',
  },
  {
    name: 'websiteUrl',
    id: 'profile-website',
    label: 'Сайт',
    kind: 'input',
    type: 'url',
    placeholder: 'https://example.com',
  },
] satisfies ReadonlyArray<FormFieldConfig<ProfileFormValues>>;

const ProfileFormContent = ({ user }: { user: AuthUser }) => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: toProfileFormValues(user),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);

    try {
      const data = await profileService.update(toUpdateProfilePayload(values));
      dispatch(setUser(data));
      reset(toProfileFormValues(data));
      showSuccessToast('Профиль сохранён');
    } catch {
      // handled by API interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={b.block()} onSubmit={handleSubmit(onSubmit)}>
      <p className={b.el('email')}>{user.email}</p>
      <FormFields fields={fields} control={control} />
      <Button type="submit" fullWidth isLoading={isLoading} showLoader loadingText="Сохранение...">
        Сохранить
      </Button>
    </form>
  );
};

export const ProfileForm = () => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return <p className={b.el('status')}>Загрузка профиля...</p>;
  }

  return <ProfileFormContent key={user.id} user={user} />;
};
