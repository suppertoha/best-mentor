import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/app/store/hooks';
import { authService } from '@/shared/api';
import { ROUTES } from '@/shared/config';
import { loginWithToken } from '@/app/hooks';
import { FormFields, type FormFieldConfig } from '@/shared/ui/form-fields';
import { Button } from '@/shared/ui';
import { registerSchema, type RegisterFormValues } from '../../model/schema';
import { bem } from '@/shared/lib/bem';
import styles from '../LoginForm/LoginForm.module.scss';

const b = bem(styles, 'auth-form');

const fields = [
  {
    name: 'email',
    id: 'register-email',
    label: 'Email',
    kind: 'input',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'student@example.com',
  },
  {
    name: 'password',
    id: 'register-password',
    label: 'Пароль',
    kind: 'input',
    type: 'password',
    autoComplete: 'new-password',
    placeholder: 'минимум 6 символов',
  },
] satisfies ReadonlyArray<FormFieldConfig<RegisterFormValues>>;

export const RegisterForm = () => {
  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);

    try {
      const data = await authService.register(values);

      if (data.accessToken) {
        await loginWithToken(dispatch, data.accessToken);
        navigate(ROUTES.sections, { replace: true });
        return;
      }

      navigate(ROUTES.login, { replace: true });
    } catch {
      // handled by API interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={b.block()} onSubmit={handleSubmit(onSubmit)}>
      <FormFields fields={fields} control={control} />
      <Button type="submit" fullWidth isLoading={isLoading} showLoader loadingText="Загрузка...">
        Зарегистрироваться
      </Button>
      <p className={b.el('footer')}>
        Уже есть аккаунт? <Link to={ROUTES.login}>Войти</Link>
      </p>
    </form>
  );
};
