import type { AppDispatch } from "@/app/store/store";
import type { AuthUser } from "@/entities/user";
import { fetchProfile } from "./fetchProfile";
import { saveAuthSession } from "./saveAuthSession";

export const authenticateWithToken = async (
  dispatch: AppDispatch,
  accessToken: string,
): Promise<AuthUser> => {
  const user = await fetchProfile(accessToken);
  saveAuthSession(dispatch, accessToken, user);

  return user;
};
