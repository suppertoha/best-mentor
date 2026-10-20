import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    skipErrorToast?: boolean;
    errorMessage?: string;
  }
}
