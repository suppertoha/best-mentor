import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/app/store/hooks";
import { api } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { authenticateWithToken } from "@/shared/lib/auth";
import { showErrorToast } from "@/shared/lib/toast";
import { FormFields, type FormFieldConfig } from "@/shared/ui/form-fields";
import type { LoginResponse } from "../../model/types";
import { loginSchema, type LoginFormValues } from "../../model/schema";
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
      const { data } = await api.post<LoginResponse>("/auth/login", values);
      await authenticateWithToken(dispatch, data.accessToken);
      navigate(ROUTES.sections, { replace: true });
    } catch (err) {
      showErrorToast(err, "Ошибка входа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormFields fields={fields} control={control} />
      <button className={styles.submit} type="submit" disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Войти"}
      </button>
      <p className={styles.link}>
        Нет аккаунта? <Link to={ROUTES.register}>Зарегистрироваться</Link>
      </p>
    </form>
  );
};
