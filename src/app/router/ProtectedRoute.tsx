import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import { ROUTES } from '@/shared/config';
import { bem } from '@/shared/lib/bem';
import styles from './ProtectedRoute.module.scss';

const b = bem(styles, 'protected-route');

export const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.user.token);

  if (token === undefined) {
    return <p className={b.el('loader')}>Загрузка...</p>;
  }

  if (!token) return <Navigate to={ROUTES.login} />;

  return <Outlet />;
};
