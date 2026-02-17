"use client";

import Image from "next/image";
import {
    LOCAL_ICON_SIZE,
    LOCAL_MAP_SCALE,
    CHICAGO_WARRIORS_BASEBALL_CLUB_IMAGE_PATH,
} from "@/lib/constants";

const size = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;

export function ChicagoWarriorsBaseballClub() {
    return <div />;
}

export function ChicagoWarriorsBaseballClubLocalIcon() {
    return (
        <Image
            src={CHICAGO_WARRIORS_BASEBALL_CLUB_IMAGE_PATH}
            alt="Chicago Warriors Baseball Club"
            width={size}
            height={size}
            className="object-contain pointer-events-none"
        />
    );
}
