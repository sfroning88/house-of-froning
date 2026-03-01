"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { DS_MODAL_ZOOM_RATIO } from "@/lib/constants";
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
        <h2 className="text-xl font-semibold">Google Books</h2>
        <button
          onClick={onClose}
          className="text-slate-600 hover:text-slate-800 text-2xl leading-none"
        >
          ×
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {isLoading ? (
          <div className="text-slate-500">Loading...</div>
        ) : bookToShow ? (
          <>
            {bookToShow.coverImageUrl && (
              <Image
                src={bookToShow.coverImageUrl}
                alt={bookToShow.title}
                width={192}
                height={288}
                className="w-48 h-72 object-cover rounded-lg shadow-md"
              />
            )}
            <div className="text-center">
              <h3 className="text-lg font-semibold">{bookToShow.title}</h3>
              <p className="text-slate-600">{bookToShow.author}</p>
              <p className="text-sm text-slate-500 mt-1 capitalize">
                {bookToShow.status}
              </p>
            </div>
            {bookToShow.topics && (
              <div className="text-center">
                <p className="text-sm text-slate-600">
                  Topics: {bookToShow.topics}
                </p>
              </div>
            )}
            {bookToShow.thoughts && (
              <div className="text-center max-w-md">
                <p className="text-sm text-slate-700">{bookToShow.thoughts}</p>
              </div>
            )}
            {bookToShow.daysToRead > 0 && (
              <div className="text-center">
                <p className="text-sm text-slate-500">
                  {bookToShow.daysToRead} days to read
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-slate-500">No book data available</div>
        )}
      </div>
    </div>
  );
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}
