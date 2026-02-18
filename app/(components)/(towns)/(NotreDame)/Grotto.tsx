"use client";

import Image from "next/image";
import {
  LOCAL_ICON_SIZE,
  LOCAL_MAP_SCALE,
  GROTTO_IMAGE_PATH,
} from "@/lib/constants";

export function GrottoLocalIcon() {
  const size = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;
  return (
    <Image
      src={GROTTO_IMAGE_PATH}
      alt="Grotto"
      width={size}
      height={size}
      className="object-contain pointer-events-none"
    />
  );
}
