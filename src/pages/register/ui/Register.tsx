import { RegisterForm } from "@/features/auth";
import styles from "./Register.module.scss";

export const RegisterPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Регистрация</h1>
      <RegisterForm />
    </div>
  );
};
