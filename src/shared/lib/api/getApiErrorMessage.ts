import { isAxiosError } from "axios";

export const getApiErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (!isAxiosError(error)) return fallback;

  if (error.response?.status === 401) {
    return "Неверный email или пароль";
  }

  const data = error.response?.data;
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    return data.message;
  }

  return error.message || fallback;
};