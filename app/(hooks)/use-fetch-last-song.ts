"use client";

import { useMutation } from "@tanstack/react-query";
import { fetchLastSongAction } from "@app/(actions)/spotify-action";

export function useFetchLastSong() {
  return useMutation({
    mutationFn: async () => {
      return await fetchLastSongAction({});
    },
  });
}
