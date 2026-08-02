import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { ROUTES } from "@/shared/config";

interface ChildrenProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ChildrenProps) => {
  const token = useAppSelector((state) => state.user.token);

  if (!token) return <Navigate to={ROUTES.login} replace />;

  return <>{children}</>;
};
