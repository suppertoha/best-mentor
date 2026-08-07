import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setUser } from "@/entities/user";
import { profileService } from "@/shared/api";
import { showSuccessToast } from "@/shared/lib/toast";
import { FormFields, type FormFieldConfig } from "@/shared/ui/form-fields";
import { Button } from "@/shared/ui";
import {
  emptyProfileValues,
  profileSchema,
  toProfileFormValues,
  toUpdateProfilePayload,
  type ProfileFormValues,
} from "../../model/schema";
import styles from "./ProfileForm.module.scss";

const fields = [
  {
    name: "firstName",
    id: "profile-first-name",
    label: "Имя",
    kind: "input",
    type: "text",
    placeholder: "Алексей",
  },
  {
    name: "lastName",
    id: "profile-last-name",
    label: "Фамилия",
    kind: "input",
    type: "text",
    placeholder: "Иванов",
  },
  {
    name: "bio",
    id: "profile-bio",
    label: "О себе",
    kind: "textarea",
    placeholder: "Frontend-разработчик, изучаю React",
  },
  {
    name: "telegramUsername",
    id: "profile-telegram",
    label: "Telegram",
    kind: "input",
    type: "text",
    placeholder: "username",
  },
  {
    name: "githubUrl",
    id: "profile-github",
    label: "GitHub",
    kind: "input",
    type: "url",
    placeholder: "https://github.com/username",
  },
  {
    name: "websiteUrl",
    id: "profile-website",
    label: "Сайт",
    kind: "input",
    type: "url",
    placeholder: "https://example.com",
  },
] satisfies ReadonlyArray<FormFieldConfig<ProfileFormValues>>;

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const { control, handleSubmit, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: emptyProfileValues,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      reset(toProfileFormValues(user));
    }
  }, [user, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);

    try {
      const data = await profileService.update(toUpdateProfilePayload(values));
      dispatch(setUser(data));
      reset(toProfileFormValues(data));
      showSuccessToast("Профиль сохранён");
    } catch {
      // handled by API interceptor
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <p className={styles.status}>Загрузка профиля...</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.email}>{user.email}</p>
      <FormFields fields={fields} control={control} />
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        showLoader
        loadingText="Сохранение..."
      >
        Сохранить
      </Button>
    </form>
  );
};
