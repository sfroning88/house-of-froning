import "server-only";

import { env } from "@packages/config";

let cachedSongUrl: string | null = null;

export const SpotifyService = {
  async fetchLastSong(): Promise<string | null> {
    if (cachedSongUrl) {
      return cachedSongUrl;
    }
    const apiKey = env.SPOTIFY_API_KEY;
    if (!apiKey) {
      return null;
    }
    try {
      return "yay";
    } catch (error) {
      console.error("[Spotify] Unexpected error:", error);
      return null;
    }
  },
};
