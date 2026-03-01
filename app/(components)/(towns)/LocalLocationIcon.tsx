"use client";

import Image from "next/image";
import { LOCAL_ICON_SIZE, LOCAL_MAP_SCALE } from "@/lib/constants";

type LocalLocationIconProps = {
  src: string;
  alt: string;
};

export function LocalLocationIcon({ src, alt }: LocalLocationIconProps) {
  const size = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="object-contain pointer-events-none"
    />
  );
}
