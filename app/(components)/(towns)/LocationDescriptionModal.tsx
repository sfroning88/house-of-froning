"use client";

import { ModalBackdrop } from "@/app/(components)/ModalBackdrop";
import { HOVER_LOCATION, HoverConfig } from "@/lib/types";

type LocationDescriptionModalProps = {
  location: HOVER_LOCATION;
  onClose: () => void;
};

export function LocationDescriptionModal({
  location,
  onClose,
}: LocationDescriptionModalProps) {
  const title = location.charAt(0).toUpperCase() + location.slice(1);
  return (
    <>
      <ModalBackdrop
        className="absolute inset-0 z-40 bg-black/50"
        onClose={onClose}
      />
      <div
        className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
        aria-hidden
      >
        <div className="w-[min(260px,90%)] bg-white border-2 border-slate-400 p-3 shadow-lg flex flex-col gap-2 pointer-events-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-800 text-lg leading-none"
            >
              ×
            </button>
          </div>
          <p className="text-xs text-slate-600">{HoverConfig[location]}</p>
        </div>
      </div>
    </>
  );
}
