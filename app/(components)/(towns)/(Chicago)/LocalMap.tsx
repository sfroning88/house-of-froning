"use client";

import { SeansHouseLocalIcon } from "./SeansHouse";
import { ChicagoWarriorsBaseballClubLocalIcon } from "./ChicagoWarriorsBaseballClub";
import { RowanLabsLocalIcon } from "./RowanLabs";
import { SaintAlphonsusAcademyLocalIcon } from "./SaintAlphonsusAcademy";
import {
    LOCAL_MAP_PIXEL_WIDTH,
    LOCAL_MAP_PIXEL_HEIGHT,
    LOCAL_MAP_SCALE,
    SEANS_HOUSE_X,
    SEANS_HOUSE_Y,
    SAINT_ALPHONSUS_ACADEMY_X,
    SAINT_ALPHONSUS_ACADEMY_Y,
    CHICAGO_WARRIORS_BASEBALL_CLUB_X,
    CHICAGO_WARRIORS_BASEBALL_CLUB_Y,
    ROWAN_LABS_X,
    ROWAN_LABS_Y,
} from "@/lib/constants";

const localMapWidth = LOCAL_MAP_PIXEL_WIDTH * LOCAL_MAP_SCALE;
const localMapHeight = LOCAL_MAP_PIXEL_HEIGHT * LOCAL_MAP_SCALE;

export function LocalMap() {
    return (
        <div
            className="relative bg-iceberg-deep/60 border-2 border-iceberg-medium"
            style={{
                width: localMapWidth,
                height: localMapHeight,
                aspectRatio: `${LOCAL_MAP_PIXEL_WIDTH} / ${LOCAL_MAP_PIXEL_HEIGHT}`,
            }}
        >
            <div
                className="absolute"
                style={{
                    left: SEANS_HOUSE_X * LOCAL_MAP_SCALE,
                    top: SEANS_HOUSE_Y * LOCAL_MAP_SCALE,
                }}
            >
                <SeansHouseLocalIcon />
            </div>
            <div
                className="absolute"
                style={{
                    left: SAINT_ALPHONSUS_ACADEMY_X * LOCAL_MAP_SCALE,
                    top: SAINT_ALPHONSUS_ACADEMY_Y * LOCAL_MAP_SCALE,
                }}
            >
                <SaintAlphonsusAcademyLocalIcon />
            </div>
            <div
                className="absolute"
                style={{
                    left: CHICAGO_WARRIORS_BASEBALL_CLUB_X * LOCAL_MAP_SCALE,
                    top: CHICAGO_WARRIORS_BASEBALL_CLUB_Y * LOCAL_MAP_SCALE,
                }}
            >
                <ChicagoWarriorsBaseballClubLocalIcon />
            </div>
            <div
                className="absolute"
                style={{
                    left: ROWAN_LABS_X * LOCAL_MAP_SCALE,
                    top: ROWAN_LABS_Y * LOCAL_MAP_SCALE,
                }}
            >
                <RowanLabsLocalIcon />
            </div>
        </div>
    );
}
