"use client";

import { useState, useEffect } from "react";
import { Icon } from "../(NotreDame)/Icon";
import { Description } from "../(NotreDame)/Description";
import {
  DS_TO_WEB_SCALE,
  NOTRE_DAME_WIDTH,
  NOTRE_DAME_HEIGHT,
} from "@/lib/constants";

type NotreDameProps = {
  onVisitTown?: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
  isModalOpen: boolean;
  screenSize: { width: number; height: number };
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
};

export function NotreDame({
  onVisitTown,
  onModalStateChange,
  isModalOpen,
  screenSize,
  dsInnerScreenSize,
  dsInnerScreenCenter,
}: NotreDameProps) {
  const iconWidth = NOTRE_DAME_WIDTH * DS_TO_WEB_SCALE;
  const iconHeight = NOTRE_DAME_HEIGHT * DS_TO_WEB_SCALE;
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
