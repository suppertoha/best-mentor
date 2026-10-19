import { isAxiosError } from "axios";

const isAuthRequest = (url?: string) =>
  url?.includes("/auth/login") || url?.includes("/auth/register");

const formatNestMessage = (message: unknown): string | null => {
  if (typeof message === "string" && message.length > 0) {
    return message;
  }

  if (Array.isArray(message)) {
    const parts = message.filter(
      (item): item is string => typeof item === "string" && item.length > 0,
    );
    if (parts.length > 0) {
      return parts.join(". ");
    }
  }

  return null;
};

export const getApiErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (!isAxiosError(error)) return fallback;

  const status = error.response?.status;
  const url = error.config?.url;

  if (status === 401) {
    return isAuthRequest(url)
      ? "Неверный email или пароль"
      : "Сессия истекла. Войдите снова";
  }

  const data = error.response?.data;
  if (typeof data === "object" && data !== null && "message" in data) {
    const formatted = formatNestMessage(data.message);
    if (formatted) return formatted;
  }

  return error.message || fallback;
};
