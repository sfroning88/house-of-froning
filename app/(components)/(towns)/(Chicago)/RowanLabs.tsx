"use client";

import Image from "next/image";
import {
  LOCAL_ICON_SIZE,
  LOCAL_MAP_SCALE,
  ROWAN_LABS_IMAGE_PATH,
} from "@/lib/constants";

export function RowanLabsLocalIcon() {
  const size = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;
  return (
    <Image
      src={ROWAN_LABS_IMAGE_PATH}
      alt="Rowan Labs"
      width={size}
      height={size}
      className="object-contain pointer-events-none"
    />
  );
}
