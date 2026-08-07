import type { AuthUser } from "@/entities/user";
import { api } from "../client";
import type { UpdateProfileDto } from "../dto/profile.dto";

export const profileService = {
  async getProfile(
    accessToken: string,
    signal?: AbortSignal,
    options?: { skipErrorToast?: boolean },
  ) {
    const { data } = await api.get<AuthUser>("/profile", {
      signal,
      headers: { Authorization: `Bearer ${accessToken}` },
      skipErrorToast: options?.skipErrorToast,
      errorMessage: "Не удалось загрузить профиль",
    });
    return data;
  },

  async update(payload: UpdateProfileDto) {
    const { data } = await api.patch<AuthUser>("/profile", payload, {
      errorMessage: "Не удалось сохранить профиль",
    });
    return data;
  },
};
