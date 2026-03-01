"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import { DS_MODAL_ZOOM_RATIO } from "@/lib/constants";
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
        <h2 className="text-xl font-semibold">ResumeContent</h2>
        <button
          onClick={onClose}
          className="text-slate-600 hover:text-slate-800 text-2xl leading-none"
        >
          ×
        </button>
      </div>
      <div className="text-sm overflow-auto flex-1 prose prose-sm max-w-none">
        {isLoading ? "Loading..." : <ReactMarkdown>{content}</ReactMarkdown>}
      </div>
    </div>
  );
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}
