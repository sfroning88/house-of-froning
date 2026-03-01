"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { DS_MODAL_ZOOM_RATIO } from "@/lib/constants";
import { useFetchLastSong } from "@/app/(hooks)/use-fetch-last-song";

type GoogleBooksProps = {
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  onClose: () => void;
};

export function GoogleBooks({
  onModalStateChange,
  dsInnerScreenSize,
  dsInnerScreenCenter,
  onClose,
}: GoogleBooksProps) {
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
  const modalContent = (
    <div
      ref={modalRef}
      className="fixed bg-white border-4 border-slate-400 p-6 shadow-lg z-50 flex flex-col gap-4 overflow-auto transition-all duration-300"
      style={{
        left: `${dsInnerScreenCenter.x}px`,
        top: `${dsInnerScreenCenter.y}px`,
        transform: `translate(-50%, -50%)`,
        width: `${modalWidth}px`,
        height: `${modalHeight}px`,
        maxWidth: `${modalWidth}px`,
        maxHeight: `${modalHeight}px`,
        minWidth: `${modalWidth}px`,
        minHeight: `${modalHeight}px`,
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Google Books</h2>
        <button
          onClick={onClose}
          className="text-slate-600 hover:text-slate-800 text-2xl leading-none"
        >
          ×
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {isLoading ? (
          <div className="text-slate-500">Loading...</div>
        ) : song ? (
          <>
            {song.album.images[0] && (
              <Image
                src={song.album.images[0].url}
                alt={song.album.name}
                width={192}
                height={192}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
            )}
            <div className="text-center">
              <h3 className="text-lg font-semibold">{song.name}</h3>
              <p className="text-slate-600">
                {song.artists.map((artist) => artist.name).join(", ")}
              </p>
              <p className="text-sm text-slate-500 mt-1">{song.album.name}</p>
            </div>
            <a
              href={song.externalUrls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Open in Spotify
            </a>
          </>
        ) : (
          <div className="text-slate-500">No song data available</div>
        )}
      </div>
    </div>
  );
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}
