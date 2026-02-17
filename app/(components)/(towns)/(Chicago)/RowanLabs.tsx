"use client";

import Image from "next/image";
import {
    LOCAL_ICON_SIZE,
    LOCAL_MAP_SCALE,
    ROWAN_LABS_IMAGE_PATH,
} from "@/lib/constants";

const size = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;

export function RowanLabs() {
    return <div />;
}

export function RowanLabsLocalIcon() {
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
