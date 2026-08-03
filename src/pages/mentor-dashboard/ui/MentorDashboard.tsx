import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store/hooks";
import { clearToken } from "@/entities/user";
import { ROUTES } from "@/shared/config";
import { TOKEN_STORAGE_KEY } from "@/shared/config/token";
import styles from "./MentorDashboard.module.scss";

export const MentorDashboardPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    dispatch(clearToken());
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>MentorDashboardPage</h1>
      <button className={styles.logoutBtn} type="button" onClick={handleLogout}>
        Выйти
      </button>
    </div>
  );
};
