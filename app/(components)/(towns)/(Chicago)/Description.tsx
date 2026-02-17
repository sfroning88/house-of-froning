"use client";

import Image from "next/image";
import { LocalMap } from "./LocalMap";
import {
  CHICAGO_IMAGE_PATH,
  DS_TO_WEB_SCALE,
  TOWN_MODAL_WIDTH,
  TOWN_MODAL_HEIGHT,
} from "@/lib/constants";
import { chicagoDescription, chicagoBullets } from "@/lib/text";

export function Description() {
  const modalWidth = TOWN_MODAL_WIDTH * DS_TO_WEB_SCALE;
  const modalHeight = TOWN_MODAL_HEIGHT * DS_TO_WEB_SCALE;
  return (
    <div
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-slate-400 p-6 shadow-lg z-50 flex flex-col gap-4 overflow-auto"
      style={{ width: modalWidth, height: modalHeight }}
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
        <LocalMap />
      </div>
    </div>
  );
}
