"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useMediaQuery } from "@/app/(hooks)/use-media-query";
import { DS_MODAL_ZOOM_RATIO, MOBILE_BREAKPOINT } from "@/lib/constants";
import { TEST_IDS } from "@/lib/test-ids";
import { useGetBookToShow } from "@/app/(hooks)/use-get-book-to-show";

type GoogleBooksProps = {
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  onClose: () => void;
};

export function GoogleBooks({
  onModalStateChange,
  dsInnerScreenSize,
  dsInnerScreenCenter,
  onClose,
}: GoogleBooksProps) {
  const isMobile = !useMediaQuery(`(min-width: ${MOBILE_BREAKPOINT}px)`, true);
  const modalRef = useRef<HTMLDivElement>(null);
  const { data: bookToShow, isLoading } = useGetBookToShow();
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
  const coverWidth = isMobile ? 96 : 192;
  const coverHeight = isMobile ? 144 : 288;
  const modalContent = (
    <div
      data-testid={TEST_IDS.googleBooksModal}
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
            Get Yo Knowledge Up
          </h2>
          <button
            onClick={onClose}
            className={`text-slate-600 hover:text-slate-800 leading-none ${isMobile ? "text-xl" : "text-2xl"}`}
          >
            ×
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 overflow-y-auto min-h-0">
          {isLoading ? (
            <div
              className={`text-slate-500 ${isMobile ? "text-sm" : "text-base"}`}
            >
              Loading...
            </div>
          ) : bookToShow ? (
            <>
              {bookToShow.coverImageUrl && (
                <Image
                  src={bookToShow.coverImageUrl}
                  alt={bookToShow.title}
                  width={coverWidth}
                  height={coverHeight}
                  className="object-cover rounded-lg shadow-md"
                  style={{ width: coverWidth, height: coverHeight }}
                />
              )}
              <div className="text-center min-w-0">
                <h3
                  className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}
                >
                  {bookToShow.title}
                </h3>
                <p
                  className={`text-slate-600 ${isMobile ? "text-xs" : "text-sm"}`}
                >
                  Author: {bookToShow.author}
                </p>
                <p
                  className={`text-slate-500 mt-1 capitalize ${isMobile ? "text-xs" : "text-sm"}`}
                >
                  Status: {bookToShow.status}
                </p>
              </div>
              {bookToShow.topics && (
                <div className="text-center min-w-0">
                  <p
                    className={`text-slate-600 ${isMobile ? "text-xs" : "text-sm"}`}
                  >
                    Topics: {bookToShow.topics}
                  </p>
                </div>
              )}
              {bookToShow.thoughts && (
                <div className="text-center max-w-md min-w-0">
                  <p
                    className={`text-slate-700 ${isMobile ? "text-xs" : "text-sm"}`}
                  >
                    Thoughts: {bookToShow.thoughts}
                  </p>
                </div>
              )}
              {bookToShow.daysToRead > 0 && (
                <div className="text-center">
                  <p
                    className={`text-slate-500 ${isMobile ? "text-xs" : "text-sm"}`}
                  >
                    I&apos;ve been reading this for {bookToShow.daysToRead} now!
                  </p>
                </div>
              )}
            </>
          ) : (
            <div
              className={`text-slate-500 ${isMobile ? "text-sm" : "text-base"}`}
            >
              No book data available
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
