import { RegisterForm } from "@/features/auth";
import { bem } from "@/shared/lib/bem";
import styles from "./Register.module.scss";

const b = bem(styles, "register-page");

export const Register = () => {
  return (
    <div className={b.block()}>
      <h1 className={b.el("title")}>Регистрация</h1>
      <RegisterForm />
    </div>
  );
};
