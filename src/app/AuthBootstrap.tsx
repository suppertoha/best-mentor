import { useEffect } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { setToken } from "@/entities/user";
import { TOKEN_STORAGE_KEY } from "@/shared/config/token";

export const AuthBootstrap = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (savedToken) {
      dispatch(setToken(savedToken));
    }
  }, [dispatch]);

  return null;
};
