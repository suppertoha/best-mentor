import { createBrowserRouter, Navigate } from "react-router-dom";
import { BaseLayout } from "@/app/layouts";
import { ROUTES } from "@/shared/config";
import { Sections } from "@/pages/sections";
import { Login } from "@/pages/login";
import { Register } from "@/pages/register";
import { NotFound } from "@/pages/not-found";
import { Chapter } from "@/pages/chapter";
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
        element: <Login />,
      },
      {
        path: ROUTES.register.slice(1),
        element: <Register />,
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
            element: <Sections />,
          },
          {
            path: ROUTES.chapter.slice(1),
            element: <Chapter />,
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.notFound.slice(1),
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.notFound} replace />,
  },
]);
