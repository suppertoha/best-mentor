import { RouterProvider } from 'react-router-dom';
import { router } from './router/router-config';

export const App = () => {
  return <RouterProvider router={router} />;
};