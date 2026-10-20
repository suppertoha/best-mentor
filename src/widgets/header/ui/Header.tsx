import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { clearToken, getUserInitials, isAdmin } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import { TOKEN_STORAGE_KEY } from '@/shared/config/token';
import { bem } from '@/shared/lib/bem';
import { Button } from '@/shared/ui';
import styles from './Header.module.scss';

const b = bem(styles, 'header');

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
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
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
    <header className={b.block()}>
      <div className={b.el('inner')}>
        <Link to={ROUTES.sections} className={b.el('logo')} aria-label="На главную — разделы">
          Best Mentor
        </Link>
        <div className={b.el('actions')}>
          {isAdmin(user) && (
            <Link to={ROUTES.admin} className={b.el('admin-link')}>
              Админка
            </Link>
          )}
          {isAdmin(user) && <span className={b.el('role-badge')}>Admin</span>}
          <div className={b.el('menu')} ref={menuRef}>
            <Button
              variant="ghost"
              className={b.el('avatar')}
              type="button"
              aria-label="Меню пользователя"
              aria-expanded={isMenuOpen}
              aria-haspopup="menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {getUserInitials(user)}
            </Button>
            {isMenuOpen && (
              <div className={b.el('dropdown')} role="menu">
                <Button
                  variant="ghost"
                  className={b.el('menu-item')}
                  type="button"
                  onClick={handleProfileClick}
                >
                  Профиль
                </Button>
                <Button
                  variant="ghost"
                  className={b.el('menu-item')}
                  type="button"
                  onClick={handleLogout}
                >
                  Выйти
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
