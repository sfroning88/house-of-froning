"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useMediaQuery } from "@/app/(hooks)/use-media-query";
import { TEST_IDS } from "@/lib/test-ids";
import {
  DS_MODAL_ZOOM_RATIO,
  MOBILE_BREAKPOINT,
  TRAINER_CARD_IMAGE_PATH,
} from "@/lib/constants";

type TrainerCardProps = {
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  onClose: () => void;
};

export function TrainerCard({
  onModalStateChange,
  dsInnerScreenSize,
  dsInnerScreenCenter,
  onClose,
}: TrainerCardProps) {
  const isMobile = !useMediaQuery(`(min-width: ${MOBILE_BREAKPOINT}px)`, true);
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    onModalStateChange?.(true);
    return () => {
      onModalStateChange?.(false);
    };
  }, [onModalStateChange]);
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const cstTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Chicago" }),
      );
      const hours = cstTime.getHours().toString().padStart(2, "0");
      const minutes = cstTime.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours} ${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
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
      data-testid={TEST_IDS.trainerCardModal}
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
            TRAINER CARD
          </h2>
          <div className="flex items-center gap-2">
            <span
              className={`text-yellow-600 font-sans font-bold ${isMobile ? "text-base" : "text-lg"}`}
            >
              ★★★★★
            </span>
            <button
              data-testid={TEST_IDS.trainerCardClose}
              onClick={onClose}
              className={`text-black hover:text-slate-600 font-bold leading-none ml-1 ${isMobile ? "text-lg" : "text-xl"}`}
            >
              ×
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto min-h-0 min-w-0">
          {isMobile ? (
            <div className="flex flex-col gap-3 py-2 text-black font-sans font-bold">
              <div className="grid grid-cols-[1fr_1fr] gap-x-3 gap-y-1.5 text-xs">
                <span className="uppercase text-left">ID No.</span>
                <span className="text-right">00087</span>
                <span className="uppercase text-left">NAME</span>
                <span className="text-right">SEAN</span>
                <span className="uppercase text-left">MONEY</span>
                <span className="text-right">$999999</span>
                <span className="uppercase text-left">POKéDEX</span>
                <span className="text-right">493</span>
                <span className="uppercase text-left">SCORE</span>
                <span className="text-right">1</span>
                <span className="uppercase text-left">TIME</span>
                <span className="text-right">{currentTime || "00 00"}</span>
                <span className="uppercase text-left">ADVENTURE STARTED</span>
                <span className="text-right">FALL 2002</span>
              </div>
              <div className="flex justify-center w-full pt-2">
                <div className="relative w-full max-w-[192px] aspect-[4/5]">
                  <Image
                    src={TRAINER_CARD_IMAGE_PATH}
                    alt="Trainer"
                    fill
                    sizes="(max-width: 768px) 192px, 192px"
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[1fr_1fr_auto] grid-rows-7 gap-x-4 gap-y-2 py-2 text-black font-sans font-bold">
              <div className="col-start-3 row-span-7 row-start-1 flex items-center justify-center self-center">
                <div className="relative w-48 h-60">
                  <Image
                    src={TRAINER_CARD_IMAGE_PATH}
                    alt="Trainer"
                    fill
                    sizes="192px"
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
              <span className="uppercase text-left text-sm">ID No.</span>
              <span className="text-right text-sm">00087</span>
              <span className="uppercase text-left text-sm">NAME</span>
              <span className="text-right text-sm">SEAN</span>
              <span className="uppercase text-left text-sm">MONEY</span>
              <span className="text-right text-sm">$999999</span>
              <span className="uppercase text-left text-sm">POKéDEX</span>
              <span className="text-right text-sm">493</span>
              <span className="uppercase text-left text-sm">SCORE</span>
              <span className="text-right text-sm">1</span>
              <span className="uppercase text-left text-sm">TIME</span>
              <span className="text-right text-sm">
                {currentTime || "00 00"}
              </span>
              <span className="uppercase text-left text-sm">
                ADVENTURE STARTED
              </span>
              <span className="text-right text-sm">FALL 2002</span>
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
