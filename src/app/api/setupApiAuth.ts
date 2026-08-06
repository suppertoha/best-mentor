import { api } from "@/shared/api";
import { store } from "@/app/store/store";
import { clearToken } from "@/entities/user";
import { TOKEN_STORAGE_KEY } from "@/shared/config/token";

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
      if (
        error.response?.status === 401 &&
        typeof store.getState().user.token === "string"
      ) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        store.dispatch(clearToken());
      }

      return Promise.reject(error);
    },
  );
};
