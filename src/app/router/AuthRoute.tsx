import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/store/hooks';
import { ROUTES } from '@/shared/config';

export const AuthRoute = () => {
  const token = useAppSelector((state) => state.user.token);

  if (token === undefined) return <p>Загрузка...</p>;

  if (token) return <Navigate to={ROUTES.sections} />;

  return <Outlet />;
};
