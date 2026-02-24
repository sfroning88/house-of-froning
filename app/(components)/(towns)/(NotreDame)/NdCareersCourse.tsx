"use client";

import Image from "next/image";
import {
  LOCAL_ICON_SIZE,
  LOCAL_MAP_SCALE,
  ND_CAREERS_COURSE_IMAGE_PATH,
} from "@/lib/constants";

export function NdCareersCourseLocalIcon() {
  const size = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;
  return (
    <Image
      src={ND_CAREERS_COURSE_IMAGE_PATH}
      alt="Grotto"
      width={size}
      height={size}
      className="object-contain pointer-events-none"
    />
  );
}
