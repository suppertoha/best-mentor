import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/app/store/hooks";
import { authService } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { loginWithToken } from "@/app/hooks";
import { FormFields, type FormFieldConfig } from "@/shared/ui/form-fields";
import { Button } from "@/shared/ui";
import { loginSchema, type LoginFormValues } from "@/features/auth/model/schema";
import styles from "./LoginForm.module.scss";

const fields = [
  {
    name: "email",
    id: "email",
    label: "Email",
    kind: "input",
    type: "email",
    autoComplete: "email",
    placeholder: "admin@fe-academy.local",
  },
  {
    name: "password",
    id: "password",
    label: "Пароль",
    kind: "input",
    type: "password",
    autoComplete: "current-password",
    placeholder: "••••••••",
  },
] satisfies ReadonlyArray<FormFieldConfig<LoginFormValues>>;

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      const { accessToken } = await authService.login(values);
      await loginWithToken(dispatch, accessToken);
      navigate(ROUTES.sections, { replace: true });
    } catch {
      // handled by API interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormFields fields={fields} control={control} />
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        showLoader
        loadingText="Загрузка..."
      >
        Войти
      </Button>
      <p className={styles.link}>
        Нет аккаунта? <Link to={ROUTES.register}>Зарегистрироваться</Link>
      </p>
    </form>
  );
};
