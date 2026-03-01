"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchLastSongAction } from "@app/(actions)/spotify-action";
import { QUERY_KEYS, SPOTIFY_STALE_TIME } from "@/lib/constants";

export function useFetchLastSong() {
  return useQuery({
    queryKey: QUERY_KEYS.spotifySong(),
    queryFn: async () => {
      return await fetchLastSongAction({});
    },
    staleTime: SPOTIFY_STALE_TIME,
  });
}
