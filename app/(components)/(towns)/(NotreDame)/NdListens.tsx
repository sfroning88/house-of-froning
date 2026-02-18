"use client";

import Image from "next/image";
import {
  LOCAL_ICON_SIZE,
  LOCAL_MAP_SCALE,
  ND_LISTENS_IMAGE_PATH,
} from "@/lib/constants";

export function NdListensLocalIcon() {
  const size = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;
  return (
    <Image
      src={ND_LISTENS_IMAGE_PATH}
      alt="ND Listens"
      width={size}
      height={size}
      className="object-contain pointer-events-none"
    />
  );
}
