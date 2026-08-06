import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routerConfig";
import { useGetUserProfile } from "./hooks";

export const App = () => {
  useGetUserProfile();
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors closeButton />
    </>
  );
};
