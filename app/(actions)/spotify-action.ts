"use server";

import { z } from "zod";
import { createPublicAction } from "@/lib/api/server/action-guards";
import { SpotifyService } from "@/lib/services/spotify/server/spotify-service";
import { SpotifySongData } from "@/lib/types";

const fetchLastSongSchema = z.object({});

export const fetchLastSongAction = createPublicAction(
  fetchLastSongSchema,
  async (): Promise<SpotifySongData | null> => {
    return await SpotifyService.fetchLastSong();
  },
);
