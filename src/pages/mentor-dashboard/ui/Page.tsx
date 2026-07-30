import { useAppDispatch } from "@/app/store/hooks";
import { logout } from "@/features/auth";
import styles from "./Page.module.scss";

export const MentorDashboardPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>MentorDashboardPage</h1>
      <button
        className={styles.logoutBtn}
        type="button"
        onClick={() => dispatch(logout())}
      >
        Выйти
      </button>
    </div>
  );
};
