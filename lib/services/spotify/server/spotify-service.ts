import "server-only";

import { env } from "@packages/config";
import { SpotifyTrackItem, SpotifySongData } from "@/lib/types";
import {
  SPOTIFY_CURRENTLY_PLAYING_URL,
  SPOTIFY_LAST_PLAYED_URL,
  SPOTIFY_STALE_TIME,
  SPOTIFY_TOKEN_URL,
} from "@/lib/constants";

let cachedSong: SpotifySongData | null = null;
let songCacheExpiresAt = 0;
let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;

export const SpotifyService = {
  async getAccessToken(): Promise<string | null> {
    if (cachedAccessToken && Date.now() < tokenExpiresAt) {
      return cachedAccessToken;
    }
    const clientId = env.SPOTIFY_CLIENT_ID;
    const clientSecret = env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = env.SPOTIFY_REFRESH_TOKEN;
    if (!clientId || !clientSecret || !refreshToken) {
      return null;
    }
    try {
      const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
        "base64",
      );
      const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authHeader}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      });
      if (!response.ok) {
        console.error("[Spotify] Token refresh failed:", response.statusText);
        return null;
      }
      const data = (await response.json()) as {
        access_token: string;
        expires_in: number;
      };
      cachedAccessToken = data.access_token;
      tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
      return cachedAccessToken;
    } catch (error) {
      console.error("[Spotify] Token refresh error:", error);
      return null;
    }
  },

  async fetchLastSong(): Promise<SpotifySongData | null> {
    if (cachedSong && Date.now() < songCacheExpiresAt) {
      return cachedSong;
    }
    const accessToken = await this.getAccessToken();
    if (!accessToken) {
      return null;
    }
    try {
      let SpotifyTrackItem: SpotifyTrackItem | null = null;
      const currentlyPlayingResponse = await fetch(
        SPOTIFY_CURRENTLY_PLAYING_URL,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (currentlyPlayingResponse.status === 200) {
        const data = (await currentlyPlayingResponse.json()) as {
          item?: SpotifyTrackItem;
        };
        if (data.item) {
          SpotifyTrackItem = data.item;
        }
      }
      if (!SpotifyTrackItem) {
        const recentlyPlayedResponse = await fetch(SPOTIFY_LAST_PLAYED_URL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (recentlyPlayedResponse.status === 200) {
          const recentlyPlayedData = (await recentlyPlayedResponse.json()) as {
            items: Array<{
              track: SpotifyTrackItem;
            }>;
          };
          if (recentlyPlayedData.items?.[0]?.track) {
            SpotifyTrackItem = recentlyPlayedData.items[0].track;
          }
        }
      }
      if (!SpotifyTrackItem) {
        return null;
      }
      const song: SpotifySongData = {
        name: SpotifyTrackItem.name,
        artists: SpotifyTrackItem.artists as [{ name: string }],
        album: {
          name: SpotifyTrackItem.album.name,
          images: SpotifyTrackItem.album.images.map((img) => ({
            url: img.url,
            width: String(img.width),
            height: String(img.height),
          })) as [{ url: string; width: string; height: string }],
        },
        externalUrls: {
          spotify: SpotifyTrackItem.external_urls.spotify,
        },
        previewUrl: SpotifyTrackItem.preview_url,
      };
      cachedSong = song;
      songCacheExpiresAt = Date.now() + SPOTIFY_STALE_TIME;
      return song;
    } catch (error) {
      console.error("[Spotify] Unexpected error:", error);
      return null;
    }
  },
};
