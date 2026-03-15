"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import posthog from "posthog-js";
import { useMediaQuery } from "@/app/(hooks)/use-media-query";
import { DS_MODAL_ZOOM_RATIO, MOBILE_BREAKPOINT } from "@/lib/constants";
import { POSTHOG_EVENTS } from "@/lib/events";
import { useFetchLastSong } from "@/app/(hooks)/use-fetch-last-song";

type SpotifySongProps = {
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  onClose: () => void;
};

export function SpotifySong({
  onModalStateChange,
  dsInnerScreenSize,
  dsInnerScreenCenter,
  onClose,
}: SpotifySongProps) {
  const isMobile = !useMediaQuery(`(min-width: ${MOBILE_BREAKPOINT}px)`, true);
  const modalRef = useRef<HTMLDivElement>(null);
  const { data: song, isLoading } = useFetchLastSong();
  useEffect(() => {
    onModalStateChange?.(true);
    return () => {
      onModalStateChange?.(false);
    };
  }, [onModalStateChange]);
  const { modalWidth, modalHeight } = useMemo(() => {
    if (dsInnerScreenSize.width === 0 || dsInnerScreenSize.height === 0) {
      return { modalWidth: 0, modalHeight: 0 };
    }
    return {
      modalWidth: dsInnerScreenSize.width * DS_MODAL_ZOOM_RATIO,
      modalHeight: dsInnerScreenSize.height * DS_MODAL_ZOOM_RATIO,
    };
  }, [dsInnerScreenSize]);
  if (modalWidth === 0 || modalHeight === 0) {
    return null;
  }
  const imageSize = isMobile ? 128 : 192;
  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2"
      aria-modal
    >
      <div
        ref={modalRef}
        className="absolute bg-white border-4 border-slate-400 shadow-lg flex flex-col gap-4 overflow-hidden transition-all duration-300"
        style={{
          left: `${dsInnerScreenCenter.x}px`,
          top: `${dsInnerScreenCenter.y}px`,
          transform: "translate(-50%, -50%)",
          width: `${modalWidth}px`,
          height: `${modalHeight}px`,
          maxWidth: `min(${modalWidth}px, 90vw)`,
          maxHeight: `min(${modalHeight}px, 90dvh)`,
          padding: isMobile ? "0.75rem" : "1.5rem",
        }}
      >
        <div className="flex items-center justify-between flex-shrink-0">
          <h2
            className={`font-semibold truncate ${isMobile ? "text-base" : "text-xl"}`}
          >
            Music To My Ears
          </h2>
          <button
            onClick={onClose}
            className={`text-slate-600 hover:text-slate-800 leading-none ${isMobile ? "text-xl" : "text-2xl"}`}
          >
            ×
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 overflow-y-auto min-h-0">
          {isLoading ? (
            <div
              className={`text-slate-500 ${isMobile ? "text-sm" : "text-base"}`}
            >
              Loading...
            </div>
          ) : song ? (
            <>
              {song.album.images[0] && (
                <Image
                  src={song.album.images[0].url}
                  alt={song.album.name}
                  width={imageSize}
                  height={imageSize}
                  className="object-cover rounded-lg shadow-md"
                  style={{ width: imageSize, height: imageSize }}
                />
              )}
              <div className="text-center min-w-0">
                <h3
                  className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}
                >
                  {song.name}
                </h3>
                <p
                  className={`text-slate-600 ${isMobile ? "text-xs" : "text-sm"}`}
                >
                  {song.artists.map((artist) => artist.name).join(", ")}
                </p>
                <p
                  className={`text-slate-500 mt-1 ${isMobile ? "text-xs" : "text-sm"}`}
                >
                  {song.album.name}
                </p>
              </div>
              <a
                href={song.externalUrls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  posthog.capture(
                    POSTHOG_EVENTS.spotify_open_in_spotify_clicked,
                    {
                      song_name: song.name,
                      artist: song.artists.map((a) => a.name).join(", "),
                      album: song.album.name,
                    },
                  )
                }
                className={`bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ${isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2"}`}
              >
                Open in Spotify
              </a>
            </>
          ) : (
            <div
              className={`text-slate-500 ${isMobile ? "text-sm" : "text-base"}`}
            >
              No song data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}
