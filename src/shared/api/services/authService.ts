import { api } from "../client";
import type {
  AuthCredentialsDto,
  LoginResponse,
  RegisterResponse,
} from "../dto/auth.dto";

export const authService = {
  async login(payload: AuthCredentialsDto) {
    const { data } = await api.post<LoginResponse>("/auth/login", payload, {
      errorMessage: "Ошибка входа",
    });
    return data;
  },

  async register(payload: AuthCredentialsDto) {
    const { data } = await api.post<RegisterResponse>("/auth/register", payload, {
      errorMessage: "Ошибка регистрации",
    });
    return data;
  },
};
