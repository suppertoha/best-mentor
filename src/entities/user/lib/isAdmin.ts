import type { AuthUser } from "../model/userSlice";

export const isAdmin = (user: AuthUser | null | undefined): boolean =>
  user?.role === "ADMIN";
