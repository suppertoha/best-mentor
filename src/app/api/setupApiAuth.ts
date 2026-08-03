import { api } from "@/shared/api";
import { store } from "@/app/store/store";

export const setupApiAuth = () => {
  api.interceptors.request.use((config) => {
    const token = store.getState().user.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};
