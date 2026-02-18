"use client";

import { useState, useEffect } from "react";
import { Icon } from "./Icon";
import { Description } from "./Description";
import {
  DS_TO_WEB_SCALE,
  CHICAGO_WIDTH,
  CHICAGO_HEIGHT,
} from "@/lib/constants";

type ChicagoProps = {
  onVisitTown?: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
  isModalOpen: boolean;
  screenSize: { width: number; height: number };
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
};

export function Chicago({
  onVisitTown,
  onModalStateChange,
  isModalOpen,
  screenSize,
  dsInnerScreenSize,
  dsInnerScreenCenter,
}: ChicagoProps) {
  const iconWidth = CHICAGO_WIDTH * DS_TO_WEB_SCALE;
  const iconHeight = CHICAGO_HEIGHT * DS_TO_WEB_SCALE;
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
        <Icon width={iconWidth} height={iconHeight} />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeModal}
          />
          <Description
            onModalStateChange={onModalStateChange}
            isModalOpen={isModalOpen}
            screenSize={screenSize}
            dsInnerScreenSize={dsInnerScreenSize}
            dsInnerScreenCenter={dsInnerScreenCenter}
          />
        </>
      )}
    </div>
  );
}
