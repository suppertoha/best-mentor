import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { LoginForm } from "@/features/auth";
import styles from "./Page.module.scss";

export const LoginPage = () => {
  const token = useAppSelector((state) => state.auth.token);

  if (token) return <Navigate to="/" replace />;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Вход</h1>
      <LoginForm />
    </div>
  );
};
