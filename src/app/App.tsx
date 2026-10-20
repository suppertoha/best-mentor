import { Toaster } from 'sonner';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routerConfig';
import { useAuthSession, useSectionsListInvalidation } from './hooks';

export const App = () => {
  useAuthSession();
  useSectionsListInvalidation();
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors closeButton />
    </>
  );
};
