import { useEffect } from "react";
import type { AppDispatch } from "@/app/store/store";
import { useAppDispatch } from "@/app/store/hooks";
import { clearToken, setToken, setUser } from "@/entities/user";
import { profileService } from "@/shared/api";
import { TOKEN_STORAGE_KEY } from "@/shared/config/token";

export async function loginWithToken(dispatch: AppDispatch, accessToken: string) {
  const user = await profileService.getProfile(accessToken);
  localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
  dispatch(setToken(accessToken));
  dispatch(setUser(user));

  return user;
}

export const useAuthSession = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!savedToken) {
      dispatch(clearToken());
      return;
    }

    profileService
      .getProfile(savedToken, undefined, { skipErrorToast: true })
      .then((user) => {
        dispatch(setToken(savedToken));
        dispatch(setUser(user));
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        dispatch(clearToken());
      });
  }, []);
};