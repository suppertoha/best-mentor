import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface ChildrenProps {
  children: ReactNode;
}
export const ProtectedRoute = ({ children }: ChildrenProps) => {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
