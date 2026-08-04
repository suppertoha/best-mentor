import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { clearToken, isAdmin } from "@/entities/user";
import { ROUTES } from "@/shared/config";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "@/shared/config/token";
import styles from "./Header.module.scss";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    dispatch(clearToken());
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.title}>Best Mentor</h1>
        <div className={styles.actions}>
          {isAdmin(user) && <span className={styles.roleBadge}>Admin</span>}
          <button className={styles.logoutBtn} type="button" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
};
