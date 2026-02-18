"use client";

import Image from "next/image";
import {
  LOCAL_ICON_SIZE,
  LOCAL_MAP_SCALE,
  GOLDEN_DOME_IMAGE_PATH,
} from "@/lib/constants";

export function GoldenDomeLocalIcon() {
  const size = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;
  return (
    <Image
      src={GOLDEN_DOME_IMAGE_PATH}
      alt="Golden Dome"
      width={size}
      height={size}
      className="object-contain pointer-events-none"
    />
  );
}
