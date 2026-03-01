"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import { useMediaQuery } from "@/app/(hooks)/use-media-query";
import { DS_MODAL_ZOOM_RATIO, MOBILE_BREAKPOINT } from "@/lib/constants";
import { useGetResumeContent } from "@/app/(hooks)/use-get-resume-content";

type ResumeContentProps = {
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  onClose: () => void;
};

export function ResumeContent({
  onModalStateChange,
  dsInnerScreenSize,
  dsInnerScreenCenter,
  onClose,
}: ResumeContentProps) {
  const isMobile = !useMediaQuery(`(min-width: ${MOBILE_BREAKPOINT}px)`, true);
  const modalRef = useRef<HTMLDivElement>(null);
  const { content, isLoading } = useGetResumeContent(true);
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
            Resume
          </h2>
          <button
            onClick={onClose}
            className={`text-slate-600 hover:text-slate-800 leading-none ${isMobile ? "text-xl" : "text-2xl"}`}
          >
            ×
          </button>
        </div>
        <div
          className={`overflow-y-auto flex-1 min-h-0 prose max-w-none min-w-0 ${
            isMobile
              ? "text-xs prose-sm prose-p:text-xs prose-li:text-xs prose-headings:text-sm"
              : "text-sm prose-sm"
          }`}
        >
          {isLoading ? (
            <span className={isMobile ? "text-xs" : "text-sm"}>Loading...</span>
          ) : (
            <ReactMarkdown>{content}</ReactMarkdown>
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
