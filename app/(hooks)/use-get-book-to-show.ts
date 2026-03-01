"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBookToShowAction } from "@app/(actions)/google-action";
import { QUERY_KEYS, GOOGLE_STALE_TIME } from "@/lib/constants";

export function useGetBookToShow() {
  return useQuery({
    queryKey: QUERY_KEYS.googleBooks(),
    queryFn: async () => {
      return await fetchBookToShowAction({});
    },
    staleTime: GOOGLE_STALE_TIME,
  });
}
