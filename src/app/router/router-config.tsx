import { createBrowserRouter, Navigate } from "react-router-dom";
import { BaseLayout } from "@/app/layouts";
import { ROUTES } from "@/shared/config";
import { MentorDashboardPage } from "@/pages/mentor-dashboard";
import { LoginPage } from "@/pages/login";
import { NotFoundPage } from "@/pages/not-found";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
  
      {
        path: "/",
        element: <ProtectedRoute><MentorDashboardPage /></ProtectedRoute>,
      },
      {
        path: ROUTES.login.slice(1),
        element: <LoginPage />,
      },
      {
        path: ROUTES.notFound,
        element: <NotFoundPage />,
      },
      {
        path: "*",
        element: <Navigate to={ROUTES.notFound} replace />,
      },
    ],
  },
]);
