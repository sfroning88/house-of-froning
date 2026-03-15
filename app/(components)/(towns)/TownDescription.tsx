"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { toast } from "sonner";
import { useOnboardingContext } from "@/app/providers";
import { LocalMap } from "./LocalMap";
import { useMediaQuery } from "@/app/(hooks)/use-media-query";
import {
  DS_MODAL_ZOOM_RATIO,
  LOCAL_MAP_WIDTH,
  LOCAL_MAP_HEIGHT,
  MOBILE_BREAKPOINT,
  CLICK_LOCATION_MESSAGE,
} from "@/lib/constants";
import type { TownContentConfig } from "@/lib/types";

type TownDescriptionProps = {
  config: TownContentConfig;
  onModalStateChange?: (isOpen: boolean) => void;
  onClose: () => void;
  dsInnerScreenSize: { width: number; height: number };
  mapCenter: { x: number; y: number };
};

export function TownDescription({
  config,
  onModalStateChange,
  onClose,
  dsInnerScreenSize,
  mapCenter,
}: TownDescriptionProps) {
  const onboarding = useOnboardingContext();
  const isMobile = !useMediaQuery(`(min-width: ${MOBILE_BREAKPOINT}px)`, true);
  const modalRef = useRef<HTMLDivElement>(null);
  const popularAreaRef = useRef<HTMLDivElement>(null);
  const [localMapScale, setLocalMapScale] = useState(1);
  const { modalWidth, modalHeight } = useMemo(() => {
    if (dsInnerScreenSize.width === 0 || dsInnerScreenSize.height === 0) {
      return { modalWidth: 0, modalHeight: 0 };
    }
    return {
      modalWidth: dsInnerScreenSize.width * DS_MODAL_ZOOM_RATIO,
      modalHeight: dsInnerScreenSize.height * DS_MODAL_ZOOM_RATIO,
    };
  }, [dsInnerScreenSize]);
  useEffect(() => {
    const el = popularAreaRef.current;
    if (!el) return;
    const updateScale = () => {
      const w = el.offsetWidth;
      setLocalMapScale(w > 0 ? Math.min(1, w / LOCAL_MAP_WIDTH) : 1);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, [modalWidth, modalHeight]);
  useEffect(() => {
    onModalStateChange?.(true);
    return () => {
      onModalStateChange?.(false);
    };
  }, [onModalStateChange]);
  useEffect(() => {
    if (onboarding && onboarding.step === 1) {
      toast(CLICK_LOCATION_MESSAGE, { id: "onboarding-2" });
    }
  }, [onboarding, onboarding?.step]);
  if (modalWidth === 0 || modalHeight === 0) {
    return null;
  }
  const modalContent = (
    <div ref={modalRef} className="fixed inset-0 z-50" aria-modal>
      <div
        className="absolute bg-white border-4 border-slate-400 p-4 shadow-lg flex flex-col gap-3 overflow-hidden transition-all duration-300"
        style={{
          left: `${mapCenter.x}px`,
          top: `${mapCenter.y}px`,
          transform: "translate(-50%, -50%)",
          width: `${modalWidth}px`,
          height: `${modalHeight}px`,
          maxWidth: `min(${modalWidth}px, 90vw)`,
          maxHeight: `min(${modalHeight}px, 90dvh)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-300 pb-2 gap-2 min-w-0 shrink-0">
          <h2
            className={`font-semibold truncate ${isMobile ? "text-base" : "text-xl"}`}
          >
            {config.title}
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            <Image
              src={config.imagePath}
              alt={config.title}
              width={isMobile ? 32 : 48}
              height={isMobile ? 32 : 48}
              className="object-contain rounded"
            />
            <button
              onClick={onClose}
              className={`text-slate-600 hover:text-slate-800 leading-none ${isMobile ? "text-xl" : "text-2xl"}`}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
        <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-4 min-w-0">
            <div className="text-left min-w-0">
              <p className={isMobile ? "text-xs" : "text-sm"}>
                {config.description}
              </p>
            </div>
            <div className="text-left min-w-0">
              <p
                className={`whitespace-pre-line ${isMobile ? "text-xs" : "text-sm"}`}
              >
                {config.bullets}
              </p>
            </div>
            <div
              ref={popularAreaRef}
              className="flex items-center justify-center min-w-0 overflow-hidden w-full"
            >
              <div
                className="overflow-hidden mx-auto"
                style={{
                  width: LOCAL_MAP_WIDTH * localMapScale,
                  height: LOCAL_MAP_HEIGHT * localMapScale,
                }}
              >
                <div
                  style={{
                    transform: `scale(${localMapScale})`,
                    transformOrigin: "top left",
                    width: LOCAL_MAP_WIDTH,
                    height: LOCAL_MAP_HEIGHT,
                  }}
                >
                  <LocalMap
                    locations={config.locations}
                    mapImagePath={config.mapImagePath}
                    onModalStateChange={onModalStateChange}
                  />
                </div>
              </div>
            </div>
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
