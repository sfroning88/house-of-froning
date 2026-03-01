"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBookImageAction } from "@app/(actions)/google-action";
import { QUERY_KEYS, GOOGLE_STALE_TIME } from "@/lib/constants";

type FetchBookImageArgs = {
  title: string;
  author: string;
};

export function useFetchBookImage({ title, author }: FetchBookImageArgs) {
  return useQuery({
    queryKey: QUERY_KEYS.googleBooks(),
    queryFn: async () => {
      return await fetchBookImageAction({ title, author });
    },
    staleTime: GOOGLE_STALE_TIME,
  });
}
