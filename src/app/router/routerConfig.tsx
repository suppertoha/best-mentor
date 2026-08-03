import { createBrowserRouter, Navigate } from "react-router-dom";
import { BaseLayout } from "@/app/layouts";
import { ROUTES } from "@/shared/config";
import { SectionsPage } from "@/pages/sections";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { NotFoundPage } from "@/pages/not-found";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthRoute } from "./AuthRoute";

export const router = createBrowserRouter([
  {
    path: ROUTES.main,
    element: <Navigate to={ROUTES.sections} replace />,
  },
  {
    element: <AuthRoute />,
    children: [
      {
        path: ROUTES.login.slice(1),
        element: <LoginPage />,
      },
      {
        path: ROUTES.register.slice(1),
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <BaseLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.sections.slice(1),
            element: <SectionsPage />,
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.notFound.slice(1),
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.notFound} replace />,
  },
]);
