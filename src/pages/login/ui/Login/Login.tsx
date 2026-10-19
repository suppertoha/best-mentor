import { LoginForm } from "@/features/auth";
import { bem } from "@/shared/lib/bem";
import styles from "./Login.module.scss";

const b = bem(styles, "login-page");

export const Login = () => {
  return (
    <div className={b.block()}>
      <h1 className={b.el("title")}>Вход</h1>
      <LoginForm />
    </div>
  );
};
