import { useEffect } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { validateStoredSession } from "@/shared/lib/auth";

export const useGetUserProfile = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    validateStoredSession(dispatch);
  }, [dispatch]);
};
