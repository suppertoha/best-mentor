import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { sectionsListQueryKey } from "@/shared/api/queryKeys";
import { subscribeSectionsProgressUpdated } from "@/shared/lib";

export const useSectionsListInvalidation = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const invalidate = () => {
      void queryClient.invalidateQueries({ queryKey: sectionsListQueryKey });
    };

    const unsubscribeProgress = subscribeSectionsProgressUpdated(invalidate);

    const handleSocketMessage = () => {
      invalidate();
    };

    window.addEventListener("ws:section-change", handleSocketMessage);

    return () => {
      unsubscribeProgress();
      window.removeEventListener("ws:section-change", handleSocketMessage);
    };
  }, [queryClient]);
};
