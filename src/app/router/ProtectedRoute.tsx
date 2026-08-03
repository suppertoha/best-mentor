import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { ROUTES } from "@/shared/config";

export const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.user.token);

  if (!token) return <Navigate to={ROUTES.login} replace />;

  return <Outlet />;
};
