"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBooksListAction } from "@app/(actions)/google-action";
import { QUERY_KEYS, GOOGLE_STALE_TIME } from "@/lib/constants";

export function useFetchBooksList() {
  return useQuery({
    queryKey: QUERY_KEYS.googleBooks(),
    queryFn: async () => {
      return await fetchBooksListAction({});
    },
    staleTime: GOOGLE_STALE_TIME,
  });
}
