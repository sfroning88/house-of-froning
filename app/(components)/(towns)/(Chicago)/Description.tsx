"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { LocalMap } from "./LocalMap";
import { CHICAGO_IMAGE_PATH, DS_MODAL_ZOOM_RATIO } from "@/lib/constants";
import { chicagoDescription, chicagoBullets } from "@/lib/text";

type DescriptionProps = {
  onModalStateChange?: (isOpen: boolean) => void;
  isModalOpen: boolean;
  screenSize: { width: number; height: number };
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
};

export function Description({
  onModalStateChange,
  isModalOpen,
  screenSize,
  dsInnerScreenSize,
  dsInnerScreenCenter,
}: DescriptionProps) {
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
        <h2 className="text-xl font-semibold">Chicago</h2>
        <Image
          src={CHICAGO_IMAGE_PATH}
          alt="Chicago"
          width={48}
          height={48}
          className="object-contain rounded"
        />
      </div>
      <p className="text-sm">{chicagoDescription}</p>
      <p className="text-sm whitespace-pre-line">{chicagoBullets}</p>
      <div className="flex justify-center">
        <LocalMap
          onModalStateChange={onModalStateChange}
          isModalOpen={isModalOpen}
          screenSize={screenSize}
          dsInnerScreenSize={dsInnerScreenSize}
          modalContainerRef={modalRef}
        />
      </div>
    </div>
  );
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}
