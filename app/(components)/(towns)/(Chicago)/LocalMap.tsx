"use client";

import { useState } from "react";
import { SeansHouseLocalIcon } from "./SeansHouse";
import { ChicagoWarriorsBaseballClubLocalIcon } from "./ChicagoWarriorsBaseballClub";
import { RowanLabsLocalIcon } from "./RowanLabs";
import { SaintAlphonsusAcademyLocalIcon } from "./SaintAlphonsusAcademy";
import { LocationHoverPopup } from "./LocationHoverPopup";
import { HOVER_LOCATION, HoverLocation, HoverConfig } from "@/lib/types";
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

export function LocalMap() {
  const localMapWidth = LOCAL_MAP_PIXEL_WIDTH * LOCAL_MAP_SCALE;
  const localMapHeight = LOCAL_MAP_PIXEL_HEIGHT * LOCAL_MAP_SCALE;
  const [hoveredLocation, setHoveredLocation] = useState<HoverLocation | null>(
    null,
  );
  const seansHouseX = SEANS_HOUSE_X * LOCAL_MAP_SCALE;
  const seansHouseY = SEANS_HOUSE_Y * LOCAL_MAP_SCALE;
  const saintAlphonsusX = SAINT_ALPHONSUS_ACADEMY_X * LOCAL_MAP_SCALE;
  const saintAlphonsusY = SAINT_ALPHONSUS_ACADEMY_Y * LOCAL_MAP_SCALE;
  const warriorsX = CHICAGO_WARRIORS_BASEBALL_CLUB_X * LOCAL_MAP_SCALE;
  const warriorsY = CHICAGO_WARRIORS_BASEBALL_CLUB_Y * LOCAL_MAP_SCALE;
  const rowanLabsX = ROWAN_LABS_X * LOCAL_MAP_SCALE;
  const rowanLabsY = ROWAN_LABS_Y * LOCAL_MAP_SCALE;
  const locationCoordinates: Record<HOVER_LOCATION, { x: number; y: number }> =
    {
      [HOVER_LOCATION.SEANS_HOUSE]: { x: seansHouseX, y: seansHouseY },
      [HOVER_LOCATION.SAINT_ALPHONSUS_ACADEMY]: {
        x: saintAlphonsusX,
        y: saintAlphonsusY,
      },
      [HOVER_LOCATION.CHICAGO_WARRIORS_BASEBALL_CLUB]: {
        x: warriorsX,
        y: warriorsY,
      },
      [HOVER_LOCATION.ROWAN_LABS]: { x: rowanLabsX, y: rowanLabsY },
    };
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
        className="absolute cursor-pointer"
        style={{
          left: seansHouseX,
          top: seansHouseY,
        }}
        onMouseEnter={() =>
          setHoveredLocation({
            location: HOVER_LOCATION.SEANS_HOUSE,
            hover: true,
          })
        }
        onMouseLeave={() => setHoveredLocation(null)}
      >
        <SeansHouseLocalIcon />
      </div>
      <div
        className="absolute cursor-pointer"
        style={{
          left: saintAlphonsusX,
          top: saintAlphonsusY,
        }}
        onMouseEnter={() =>
          setHoveredLocation({
            location: HOVER_LOCATION.SAINT_ALPHONSUS_ACADEMY,
            hover: true,
          })
        }
        onMouseLeave={() => setHoveredLocation(null)}
      >
        <SaintAlphonsusAcademyLocalIcon />
      </div>
      <div
        className="absolute cursor-pointer"
        style={{
          left: warriorsX,
          top: warriorsY,
        }}
        onMouseEnter={() =>
          setHoveredLocation({
            location: HOVER_LOCATION.CHICAGO_WARRIORS_BASEBALL_CLUB,
            hover: true,
          })
        }
        onMouseLeave={() => setHoveredLocation(null)}
      >
        <ChicagoWarriorsBaseballClubLocalIcon />
      </div>
      <div
        className="absolute cursor-pointer"
        style={{
          left: rowanLabsX,
          top: rowanLabsY,
        }}
        onMouseEnter={() =>
          setHoveredLocation({
            location: HOVER_LOCATION.ROWAN_LABS,
            hover: true,
          })
        }
        onMouseLeave={() => setHoveredLocation(null)}
      >
        <RowanLabsLocalIcon />
      </div>
      {hoveredLocation?.hover && (
        <LocationHoverPopup
          title={
            hoveredLocation.location.charAt(0).toUpperCase() +
            hoveredLocation.location.slice(1)
          }
          description={HoverConfig[hoveredLocation.location]}
          x={locationCoordinates[hoveredLocation.location].x}
          y={locationCoordinates[hoveredLocation.location].y}
        />
      )}
    </div>
  );
}
