"use client";

import Image from "next/image";
import {
  LOCAL_ICON_SIZE,
  LOCAL_MAP_SCALE,
  FOCUS_HEALTHCARE_PARTNERS_IMAGE_PATH,
} from "@/lib/constants";

export function FocusHealthcarePartnersLocalIcon() {
  const size = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;
  return (
    <Image
      src={FOCUS_HEALTHCARE_PARTNERS_IMAGE_PATH}
      alt="Focus Healthcare Partners"
      width={size}
      height={size}
      className="object-contain pointer-events-none"
    />
  );
}
