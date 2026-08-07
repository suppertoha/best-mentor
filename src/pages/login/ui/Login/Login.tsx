import { LoginForm } from "@/features/auth";
import styles from "./Login.module.scss";

export const Login = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Вход</h1>
      <LoginForm />
    </div>
  );
};
