import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setAuth } from "@/features/auth";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	if (isAuth) return <Navigate to="/" replace />
  return (
    <div>
      LoginPage
      <button style={{background: 'orange'}} onClick={() => dispatch(setAuth())}>Войти (тест)</button>
    </div>
  );
};
