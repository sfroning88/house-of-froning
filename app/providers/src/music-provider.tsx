"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import posthog from "posthog-js";
import { toast } from "sonner";
import {
  MUSIC_TRACKS,
  MUSIC_TRACK_INDEX_KEY,
  MUSIC_UNMUTE_MESSAGE,
  MUSIC_UNMUTE_TOAST_SHOWN_KEY,
  YOUTUBE_BASE_URL,
  YOUTUBE_ERROR_CODES,
} from "@/lib/constants";
import { POSTHOG_EVENTS } from "@/lib/events";
import { initialMusicState, musicReducer } from "@lib/utils";

type MusicContextValue = {
  isMuted: boolean;
  unmute: () => void;
  mute: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusicContext() {
  const ctx = useContext(MusicContext);
  if (!ctx) return null;
  return ctx;
}

function getTrackIndex(): number {
  if (typeof window === "undefined") return 0;
  const stored = sessionStorage.getItem(MUSIC_TRACK_INDEX_KEY);
  if (stored !== null) return Number(stored);
  const index = Math.floor(Math.random() * MUSIC_TRACKS.length);
  sessionStorage.setItem(MUSIC_TRACK_INDEX_KEY, String(index));
  return index;
}

function sendCommand(
  iframe: HTMLIFrameElement | null,
  func: "mute" | "unMute",
) {
  if (!iframe?.contentWindow) return;
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: "command", func, args: [] }),
    "*",
  );
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(musicReducer, initialMusicState);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const index = getTrackIndex();
    const id = setTimeout(() => {
      dispatch({ type: "hydrate", trackIndex: index });
    }, 0);
    return () => clearTimeout(id);
  }, []);
  const unmute = useCallback(() => {
    dispatch({ type: "unmute" });
    sendCommand(iframeRef.current, "unMute");
  }, []);
  const mute = useCallback(() => {
    dispatch({ type: "mute" });
    sendCommand(iframeRef.current, "mute");
    posthog.capture(POSTHOG_EVENTS.music_muted);
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== YOUTUBE_BASE_URL) return;
      try {
        const data = JSON.parse(e.data) as {
          event?: string;
          info?: { errorCode?: number; playerState?: number };
        };
        if (data.event !== "infoDelivery" || !data.info) return;
        const code = data.info.errorCode;
        if (code !== undefined && YOUTUBE_ERROR_CODES.includes(code)) {
          dispatch({
            type: "advanceTrack",
            trackCount: MUSIC_TRACKS.length,
          });
        }
      } catch {
        // ignore parse errors
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  useEffect(() => {
    if (typeof window === "undefined" || !state.mounted) return;
    if (sessionStorage.getItem(MUSIC_UNMUTE_TOAST_SHOWN_KEY)) return;
    sessionStorage.setItem(MUSIC_UNMUTE_TOAST_SHOWN_KEY, "1");
    toast(MUSIC_UNMUTE_MESSAGE, {
      id: "music-unmute",
      duration: Infinity,
      action: {
        label: "Unmute",
        onClick: () => {
          unmute();
          posthog.capture(POSTHOG_EVENTS.music_unmuted);
        },
      },
    });
  }, [state.mounted, unmute]);
  const trackId = MUSIC_TRACKS[state.effectiveTrackIndex];
  const embedUrl = `${YOUTUBE_BASE_URL}/embed/${trackId}?autoplay=1&mute=1&loop=1&playlist=${trackId}&controls=0&enablejsapi=1`;
  const value: MusicContextValue = {
    isMuted: state.isMuted,
    unmute,
    mute,
  };
  return (
    <MusicContext.Provider value={value}>
      {children}
      {state.mounted && (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          width={0}
          height={0}
          allow="autoplay"
          className="pointer-events-none absolute"
          style={{ position: "absolute" }}
          title="Background Music"
          onLoad={() => {
            iframeRef.current?.contentWindow?.postMessage(
              JSON.stringify({
                event: "listening",
                id: 1,
                channel: "widget",
              }),
              "*",
            );
          }}
          onError={() => {
            dispatch({
              type: "advanceTrack",
              trackCount: MUSIC_TRACKS.length,
            });
          }}
        />
      )}
    </MusicContext.Provider>
  );
}
