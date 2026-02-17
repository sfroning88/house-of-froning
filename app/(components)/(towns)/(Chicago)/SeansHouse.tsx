"use client";

import Image from "next/image";
import {
    LOCAL_ICON_SIZE,
    LOCAL_MAP_SCALE,
    SEANS_HOUSE_IMAGE_PATH,
} from "@/lib/constants";

const size = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;

export function SeansHouse() {
    return <div />;
}

export function SeansHouseLocalIcon() {
    return (
        <Image
            src={SEANS_HOUSE_IMAGE_PATH}
            alt="Sean's House"
            width={size}
            height={size}
            className="object-contain pointer-events-none"
        />
    );
}
