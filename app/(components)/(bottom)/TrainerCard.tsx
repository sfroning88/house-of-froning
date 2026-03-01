"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { DS_MODAL_ZOOM_RATIO, TRAINER_CARD_IMAGE_PATH } from "@/lib/constants";

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
      ref={modalRef}
      className="fixed bg-gray-200 border-4 border-slate-500 p-4 shadow-lg z-50 flex flex-col overflow-y-auto transition-all duration-300"
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
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-400 flex-shrink-0">
        <h2 className="text-base font-sans font-bold text-black tracking-wider uppercase">
          TRAINER CARD
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-yellow-600 font-sans font-bold text-lg">
            ★★★★★
          </span>
          <button
            onClick={onClose}
            className="text-black hover:text-slate-600 font-bold text-xl leading-none ml-1"
          >
            ×
          </button>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-[1fr_1fr_auto] grid-rows-7 gap-x-4 gap-y-2 py-2 text-black font-sans font-bold text-sm min-h-0">
        <div className="col-start-3 row-span-7 row-start-1 flex items-center justify-center self-center">
          <div className="relative w-48 h-60">
            <Image
              src={TRAINER_CARD_IMAGE_PATH}
              alt="Trainer"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
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
    </div>
  );
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}
