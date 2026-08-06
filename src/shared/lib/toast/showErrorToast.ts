import { toast } from "sonner";
import { getApiErrorMessage } from "@/shared/lib/api/getApiErrorMessage";

export const showErrorToast = (error: unknown, fallback: string) => {
  toast.error(getApiErrorMessage(error, fallback));
};