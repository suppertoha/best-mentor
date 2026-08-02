import { RouterProvider } from "react-router-dom";
import { router } from "./router/router-config";
import { AuthBootstrap } from "./AuthBootstrap";

export const App = () => {
  return (
    <>
      <AuthBootstrap />
      <RouterProvider router={router} />
    </>
  );
};
