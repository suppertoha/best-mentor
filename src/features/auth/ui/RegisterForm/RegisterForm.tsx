import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAppDispatch } from "@/app/store/hooks";
import { setToken, setUser } from "@/entities/user";
import { api } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "@/shared/config/token";
import type { RegisterResponse } from "../../model/types";
import styles from "../LoginForm/LoginForm.module.scss";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.post<RegisterResponse>("/auth/register", {
        email,
        password,
      });

      if (data.accessToken) {
        localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);
        dispatch(setToken(data.accessToken));

        if (data.user) {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
          dispatch(setUser(data.user));
        }

        navigate(ROUTES.sections, { replace: true });
        return;
      }

      navigate(ROUTES.login, { replace: true });
    } catch (err) {
      if (isAxiosError(err)) {
        const message =
          typeof err.response?.data === "object" &&
          err.response.data !== null &&
          "message" in err.response.data &&
          typeof err.response.data.message === "string"
            ? err.response.data.message
            : err.message;
        setError(message);
      } else {
        setError("Ошибка регистрации");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="register-email">
          Email
        </label>
        <input
          id="register-email"
          className={styles.input}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder="student@example.com"
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="register-password">
          Пароль
        </label>
        <input
          id="register-password"
          className={styles.input}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          placeholder="минимум 6 символов"
          minLength={6}
          required
        />
      </div>
      <button className={styles.submit} type="submit" disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Зарегистрироваться"}
      </button>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <p className={styles.link}>
        Уже есть аккаунт? <Link to={ROUTES.login}>Войти</Link>
      </p>
    </form>
  );
};
