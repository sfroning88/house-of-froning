"use client";

import { useState, useEffect } from "react";
import { TownIcon } from "./TownIcon";
import { TownDescription } from "./TownDescription";
import { TownContentConfig, TownConfigEntry } from "@/lib/types";
import { DS_TO_WEB_SCALE } from "@/lib/constants";

type TownProps = {
  contentConfig: TownContentConfig;
  mapConfig: TownConfigEntry;
  onVisitTown?: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  mapCenter: { x: number; y: number };
};

export function Town({
  contentConfig,
  mapConfig,
  onVisitTown,
  onModalStateChange,
  dsInnerScreenSize,
  mapCenter,
}: TownProps) {
  const iconWidth = mapConfig.width * DS_TO_WEB_SCALE;
  const iconHeight = mapConfig.height * DS_TO_WEB_SCALE;
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    onModalStateChange?.(isOpen);
  }, [isOpen, onModalStateChange]);
  const closeModal = () => {
    setIsOpen(false);
    onVisitTown?.();
  };
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <TownIcon width={iconWidth} height={iconHeight} />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeModal}
          />
          <TownDescription
            config={contentConfig}
            onModalStateChange={onModalStateChange}
            onClose={closeModal}
            dsInnerScreenSize={dsInnerScreenSize}
            mapCenter={mapCenter}
          />
        </>
      )}
    </div>
  );
}
