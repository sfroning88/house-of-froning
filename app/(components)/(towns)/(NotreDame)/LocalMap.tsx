"use client";

import { useState } from "react";
import { DuncanHallLocalIcon } from "./DuncanHall";
import { NdListensLocalIcon } from "./NdListens";
import { GoldenDomeLocalIcon } from "./GoldenDome";
import { GrottoLocalIcon } from "./Grotto";
import { LocationHoverPopup } from "./LocationHoverPopup";
import { HOVER_LOCATION, HoverLocation, HoverConfig } from "@/lib/types";
import {
  LOCAL_MAP_PIXEL_WIDTH,
  LOCAL_MAP_PIXEL_HEIGHT,
  LOCAL_MAP_SCALE,
  DUNCAN_HALL_X,
  DUNCAN_HALL_Y,
  ND_LISTENS_X,
  ND_LISTENS_Y,
  GOLDEN_DOME_X,
  GOLDEN_DOME_Y,
  GROTTO_X,
  GROTTO_Y,
} from "@/lib/constants";

export function LocalMap() {
  const localMapWidth = LOCAL_MAP_PIXEL_WIDTH * LOCAL_MAP_SCALE;
  const localMapHeight = LOCAL_MAP_PIXEL_HEIGHT * LOCAL_MAP_SCALE;
  const [hoveredLocation, setHoveredLocation] = useState<HoverLocation | null>(
    null,
  );
  const duncanHallX = DUNCAN_HALL_X * LOCAL_MAP_SCALE;
  const duncanHallY = DUNCAN_HALL_Y * LOCAL_MAP_SCALE;
  const ndListensX = ND_LISTENS_X * LOCAL_MAP_SCALE;
  const ndListensY = ND_LISTENS_Y * LOCAL_MAP_SCALE;
  const goldenDomeX = GOLDEN_DOME_X * LOCAL_MAP_SCALE;
  const goldenDomeY = GOLDEN_DOME_Y * LOCAL_MAP_SCALE;
  const grottoX = GROTTO_X * LOCAL_MAP_SCALE;
  const grottoY = GROTTO_Y * LOCAL_MAP_SCALE;
  const locationCoordinates: Partial<Record<HOVER_LOCATION, { x: number; y: number }>> =
    {
      [HOVER_LOCATION.DUNCAN_HALL]: { 
        x: duncanHallX, 
        y: duncanHallY },
      [HOVER_LOCATION.ND_LISTENS]: {
        x: ndListensX,
        y: ndListensY,
      },
      [HOVER_LOCATION.GOLDEN_DOME]: {
        x: goldenDomeX,
        y: goldenDomeY,
      },
      [HOVER_LOCATION.GROTTO]: { 
        x: grottoX,
        y: grottoY,
      },
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
          left: duncanHallX,
          top: duncanHallY,
        }}
        onMouseEnter={() =>
          setHoveredLocation({
            location: HOVER_LOCATION.DUNCAN_HALL,
            hover: true,
          })
        }
        onMouseLeave={() => setHoveredLocation(null)}
      >
        <DuncanHallLocalIcon />
      </div>
      <div
        className="absolute cursor-pointer"
        style={{
          left: ndListensX,
          top: ndListensY,
        }}
        onMouseEnter={() =>
          setHoveredLocation({
            location: HOVER_LOCATION.ND_LISTENS,
            hover: true,
          })
        }
        onMouseLeave={() => setHoveredLocation(null)}
      >
        <NdListensLocalIcon />
      </div>
      <div
        className="absolute cursor-pointer"
        style={{
          left: goldenDomeX,
          top: goldenDomeY,
        }}
        onMouseEnter={() =>
          setHoveredLocation({
            location: HOVER_LOCATION.GOLDEN_DOME,
            hover: true,
          })
        }
        onMouseLeave={() => setHoveredLocation(null)}
      >
        <GoldenDomeLocalIcon />
      </div>
      <div
        className="absolute cursor-pointer"
        style={{
          left: grottoX,
          top: grottoY,
        }}
        onMouseEnter={() =>
          setHoveredLocation({
            location: HOVER_LOCATION.GROTTO,
            hover: true,
          })
        }
        onMouseLeave={() => setHoveredLocation(null)}
      >
        <GrottoLocalIcon />
      </div>
      {hoveredLocation?.hover && locationCoordinates[hoveredLocation.location] && (
        <LocationHoverPopup
          title={
            hoveredLocation.location.charAt(0).toUpperCase() +
            hoveredLocation.location.slice(1)
          }
          description={HoverConfig[hoveredLocation.location]}
          x={locationCoordinates[hoveredLocation.location]!.x}
          y={locationCoordinates[hoveredLocation.location]!.y}
        />
      )}
    </div>
  );
}
