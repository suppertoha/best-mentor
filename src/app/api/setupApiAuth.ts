import { isAxiosError } from "axios";
import { api } from "@/shared/api";
import { store } from "@/app/store/store";
import { clearToken } from "@/entities/user";
import { TOKEN_STORAGE_KEY } from "@/shared/config/token";
import { showErrorToast } from "@/shared/lib/toast";

const isAuthRequest = (url?: string) =>
  url?.includes("/auth/login") || url?.includes("/auth/register");

export const setupApiAuth = () => {
  api.interceptors.request.use((config) => {
    const token = store.getState().user.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!isAxiosError(error)) {
        return Promise.reject(error);
      }

      if (error.code === "ERR_CANCELED") {
        return Promise.reject(error);
      }

      const status = error.response?.status;
      const url = error.config?.url;

      if (
        status === 401 &&
        !isAuthRequest(url) &&
        typeof store.getState().user.token === "string"
      ) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        store.dispatch(clearToken());
      }

      if (!error.config?.skipErrorToast && status !== 404) {
        const fallback = error.config?.errorMessage ?? "Что-то пошло не так";
        showErrorToast(error, fallback);
      }

      return Promise.reject(error);
    },
  );
};
