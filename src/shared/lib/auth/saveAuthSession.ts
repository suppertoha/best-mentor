import type { AppDispatch } from "@/app/store/store";
import { setToken, setUser, type AuthUser } from "@/entities/user";
import { TOKEN_STORAGE_KEY } from "@/shared/config/token";

export const saveAuthSession = (
  dispatch: AppDispatch,
  accessToken: string,
  user: AuthUser,
) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
  dispatch(setToken(accessToken));
  dispatch(setUser(user));
};
