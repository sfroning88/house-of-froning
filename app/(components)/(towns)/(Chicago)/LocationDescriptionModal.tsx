"use client";

import { HOVER_LOCATION, HoverConfig } from "@/lib/types";
import {
  DS_MODAL_ZOOM_RATIO,
} from "@/lib/constants";

type LocationDescriptionModalProps = {
  location: HOVER_LOCATION;
  onClose: () => void;
  isModalOpen: boolean;
  screenSize: { width: number; height: number };
  dsInnerScreenSize: { width: number; height: number };
};

export function LocationDescriptionModal({
  location,
  onClose,
  dsInnerScreenSize,
}: LocationDescriptionModalProps) {
  const modalWidth = dsInnerScreenSize.width * DS_MODAL_ZOOM_RATIO;
  const modalHeight = dsInnerScreenSize.height * DS_MODAL_ZOOM_RATIO;
  const title = location.charAt(0).toUpperCase() + location.slice(1);
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-slate-400 p-6 shadow-lg z-50 flex flex-col gap-4 overflow-auto transition-all duration-300"
        style={{ width: `${modalWidth}px`, height: `${modalHeight}px` }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-800 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <p className="text-sm">{HoverConfig[location]}</p>
      </div>
    </>
  );
}
