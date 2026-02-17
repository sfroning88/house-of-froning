"use client";

import Image from "next/image";
import {
  LOCAL_ICON_SIZE,
  LOCAL_MAP_SCALE,
  SAINT_ALPHONSUS_ACADEMY_IMAGE_PATH,
} from "@/lib/constants";

export function SaintAlphonsusAcademyLocalIcon() {
  const size = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;
  return (
    <Image
      src={SAINT_ALPHONSUS_ACADEMY_IMAGE_PATH}
      alt="Saint Alphonsus Academy"
      width={size}
      height={size}
      className="object-contain pointer-events-none"
    />
  );
}
