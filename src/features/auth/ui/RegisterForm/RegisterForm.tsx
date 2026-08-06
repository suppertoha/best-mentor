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
import type { RegisterResponse } from "../../model/types";
import { registerSchema, type RegisterFormValues } from "../../model/schema";
import styles from "../LoginForm/LoginForm.module.scss";

const fields = [
  {
    name: "email",
    id: "register-email",
    label: "Email",
    kind: "input",
    type: "email",
    autoComplete: "email",
    placeholder: "student@example.com",
  },
  {
    name: "password",
    id: "register-password",
    label: "Пароль",
    kind: "input",
    type: "password",
    autoComplete: "new-password",
    placeholder: "минимум 6 символов",
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
      const { data } = await api.post<RegisterResponse>("/auth/register", values);

      if (data.accessToken) {
        await authenticateWithToken(dispatch, data.accessToken);
        navigate(ROUTES.sections, { replace: true });
        return;
      }

      navigate(ROUTES.login, { replace: true });
    } catch (err) {
      showErrorToast(err, "Ошибка регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormFields fields={fields} control={control} />
      <button className={styles.submit} type="submit" disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Зарегистрироваться"}
      </button>
      <p className={styles.link}>
        Уже есть аккаунт? <Link to={ROUTES.login}>Войти</Link>
      </p>
    </form>
  );
};
