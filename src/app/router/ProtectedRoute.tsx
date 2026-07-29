import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface ChildrenProps {
  children: ReactNode;
}
export const ProtectedRoute = ({ children }: ChildrenProps) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  if (!isAuth) return <Navigate to="/login" replace />;
  return <>{children}</>;
};
