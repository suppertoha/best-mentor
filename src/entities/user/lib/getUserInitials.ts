import type { AuthUser } from "../model/userSlice";

export const getUserInitials = (user: AuthUser | null | undefined): string => {
  if (!user) return "?";

  const firstName = user.firstName?.trim();
  const lastName = user.lastName?.trim();

  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }

  if (firstName) {
    return firstName.slice(0, 2).toUpperCase();
  }

  if (lastName) {
    return lastName.slice(0, 2).toUpperCase();
  }

  return user.email.slice(0, 2).toUpperCase();
};
