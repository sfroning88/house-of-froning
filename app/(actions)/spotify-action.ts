"use server";

import { z } from "zod";
import { createPublicAction } from "@/lib/api/server/action-guards";
import { SpotifyService } from "@/lib/services/spotify/server/spotify-service";

const fetchLastSongSchema = z.object({});

export const fetchLastSongAction = createPublicAction(
  fetchLastSongSchema,
  async (): Promise<string | null> => {
    return await SpotifyService.fetchLastSong();
  },
);
