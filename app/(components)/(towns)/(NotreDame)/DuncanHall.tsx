"use client";

import Image from "next/image";
import {
  LOCAL_ICON_SIZE,
  LOCAL_MAP_SCALE,
  DUNCAN_HALL_IMAGE_PATH,
} from "@/lib/constants";

export function DuncanHallLocalIcon() {
  const size = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;
  return (
    <Image
      src={DUNCAN_HALL_IMAGE_PATH}
      alt="Duncan Hall"
      width={size}
      height={size}
      className="object-contain pointer-events-none"
    />
  );
}
