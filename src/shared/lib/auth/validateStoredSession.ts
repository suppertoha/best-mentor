import type { AppDispatch } from "@/app/store/store";
import { clearToken } from "@/entities/user";
import { TOKEN_STORAGE_KEY } from "@/shared/config/token";
import { authenticateWithToken } from "./authenticateWithToken";

export const validateStoredSession = async (dispatch: AppDispatch) => {
  const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!savedToken) {
    dispatch(clearToken());
    return;
  }

  try {
    await authenticateWithToken(dispatch, savedToken);
  } catch {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    dispatch(clearToken());
  }
};
