import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ChildrenProps {
	children: ReactNode
}
export const ProtectedRoute = ({ children }:ChildrenProps) => {
  const isAuth = false;
	if(!isAuth) return <Navigate to='/login' replace/>
  return <>{children}</>;
};
