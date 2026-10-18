import { RegisterForm } from "@/features/auth";
import styles from "./Register.module.scss";

export const Register = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Регистрация</h1>
      <RegisterForm />
    </div>
  );
};