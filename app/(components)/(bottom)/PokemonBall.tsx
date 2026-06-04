"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useMediaQuery } from "@/app/(hooks)/use-media-query";
import {
  DS_MODAL_ZOOM_RATIO,
  MOBILE_BREAKPOINT,
  POKEMON_ONE_IMAGE_PATH,
  POKEMON_TWO_IMAGE_PATH,
  POKEMON_THREE_IMAGE_PATH,
  POKEMON_FOUR_IMAGE_PATH,
  POKEMON_FIVE_IMAGE_PATH,
  POKEMON_SIX_IMAGE_PATH,
} from "@/lib/constants";

const POKEMON_TEAM_IMAGE_PATHS = [
  POKEMON_ONE_IMAGE_PATH,
  POKEMON_TWO_IMAGE_PATH,
  POKEMON_THREE_IMAGE_PATH,
  POKEMON_FOUR_IMAGE_PATH,
  POKEMON_FIVE_IMAGE_PATH,
  POKEMON_SIX_IMAGE_PATH,
];

type PokemonBallProps = {
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  onClose: () => void;
};

export function PokemonBall({
  onModalStateChange,
  dsInnerScreenSize,
  dsInnerScreenCenter,
  onClose,
}: PokemonBallProps) {
  const isMobile = !useMediaQuery(`(min-width: ${MOBILE_BREAKPOINT}px)`, true);
  const modalRef = useRef<HTMLDivElement>(null);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2"
      aria-modal
    >
      <div
        ref={modalRef}
        className="absolute bg-gray-200 border-4 border-slate-500 shadow-lg flex flex-col overflow-hidden transition-all duration-300"
        style={{
          left: `${dsInnerScreenCenter.x}px`,
          top: `${dsInnerScreenCenter.y}px`,
          transform: "translate(-50%, -50%)",
          width: `${modalWidth}px`,
          height: `${modalHeight}px`,
          maxWidth: `min(${modalWidth}px, 90vw)`,
          maxHeight: `min(${modalHeight}px, 90dvh)`,
          padding: isMobile ? "0.75rem" : "1rem",
        }}
      >
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-400 shrink-0">
          <h2
            className={`font-sans font-bold text-black tracking-wider uppercase ${isMobile ? "text-sm" : "text-base"}`}
          >
            See You In Pokémon Champions
          </h2>
          <button
            onClick={onClose}
            className={`text-black hover:text-slate-600 font-bold leading-none ${isMobile ? "text-lg" : "text-xl"}`}
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto min-h-0 min-w-0">
          <div
            className={
              isMobile
                ? "flex flex-col gap-3 py-2"
                : "grid grid-cols-3 grid-rows-2 gap-3 py-2"
            }
          >
            {POKEMON_TEAM_IMAGE_PATHS.map((imagePath) => (
              <div
                key={imagePath}
                className="flex items-center justify-center bg-white border-2 border-slate-400 rounded-lg p-2"
              >
                <div
                  className={`relative aspect-square w-full ${isMobile ? "max-w-[120px] mx-auto" : ""}`}
                >
                  <Image
                    src={imagePath}
                    alt=""
                    fill
                    sizes={
                      isMobile ? "120px" : "(max-width: 768px) 120px, 150px"
                    }
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}
