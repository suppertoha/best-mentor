import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAppDispatch } from "@/app/store/hooks";
import { setToken, setUser } from "@/entities/user";
import { api } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "@/shared/config/token";
import type { LoginResponse } from "../../model/types";
import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
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
      const { data } = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
      dispatch(setToken(data.accessToken));
      dispatch(setUser(data.user));
      navigate(ROUTES.sections, { replace: true });
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
        setError("Ошибка входа");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className={styles.input}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder="admin@fe-academy.local"
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          Пароль
        </label>
        <input
          id="password"
          className={styles.input}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </div>
      <button className={styles.submit} type="submit" disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Войти"}
      </button>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <p className={styles.link}>
        Нет аккаунта? <Link to={ROUTES.register}>Зарегистрироваться</Link>
      </p>
    </form>
  );
};


