import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { ROUTES } from "@/shared/config";
import styles from "./ProtectedRoute.module.scss";

export const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.user.token);

  if (token === undefined) return <p className={styles.loader}>Загрузка...</p>;

  if (!token) return <Navigate to={ROUTES.login} />;

  return <Outlet />;
};
