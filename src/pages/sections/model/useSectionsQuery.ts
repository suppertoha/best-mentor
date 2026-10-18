import { useQuery } from "@tanstack/react-query";
import { sectionsListQueryKey } from "@/shared/api/queryKeys";
import { sectionsService } from "@/shared/api/services/sectionsService";

export const useSectionsQuery = () =>
  useQuery({
    queryKey: sectionsListQueryKey,
    queryFn: ({ signal }) => sectionsService.getAll(signal),
  });