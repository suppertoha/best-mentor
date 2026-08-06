import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { clearToken, getUserInitials, isAdmin } from "@/entities/user";
import { ROUTES } from "@/shared/config";
import { TOKEN_STORAGE_KEY } from "@/shared/config/token";
import styles from "./Header.module.scss";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    dispatch(clearToken());
    setIsMenuOpen(false);
    navigate(ROUTES.login, { replace: true });
  };

  const handleProfileClick = () => {
    setIsMenuOpen(false);
    navigate(ROUTES.profile);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.title}>Best Mentor</h1>
        <div className={styles.actions}>
          {isAdmin(user) && <span className={styles.roleBadge}>Admin</span>}
          <div className={styles.menu} ref={menuRef}>
            <button
              className={styles.avatar}
              type="button"
              aria-label="Меню пользователя"
              aria-expanded={isMenuOpen}
              aria-haspopup="menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {getUserInitials(user)}
            </button>
            {isMenuOpen && (
              <div className={styles.dropdown} role="menu">
                <button className={styles.menuItem} type="button" onClick={handleProfileClick}>
                  Профиль
                </button>
                <button className={styles.menuItem} type="button" onClick={handleLogout}>
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
