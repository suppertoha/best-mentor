import type { AuthUser } from "@/entities/user";
import { api } from "@/shared/api";

export const fetchProfile = async (accessToken: string): Promise<AuthUser> => {
  const { data } = await api.get<AuthUser>("/profile", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};
