"use client";

import { useState, useEffect, useRef } from "react";
import { DuncanHallLocalIcon } from "./DuncanHall";
import { NdListensLocalIcon } from "./NdListens";
import { GoldenDomeLocalIcon } from "./GoldenDome";
import { GrottoLocalIcon } from "./Grotto";
import { NdCareersCourseLocalIcon } from "./NdCareersCourse";
import { LocationHoverPopup } from "./LocationHoverPopup";
import { LocationDescriptionModal } from "./LocationDescriptionModal";
import { HOVER_LOCATION, HoverLocation, HoverConfig } from "@/lib/types";
import {
  LOCAL_MAP_PIXEL_WIDTH,
  LOCAL_MAP_PIXEL_HEIGHT,
  LOCAL_MAP_SCALE,
  LOCAL_ICON_SIZE,
  DUNCAN_HALL_X,
  DUNCAN_HALL_Y,
  ND_LISTENS_X,
  ND_LISTENS_Y,
  GOLDEN_DOME_X,
  GOLDEN_DOME_Y,
  GROTTO_X,
  GROTTO_Y,
  ND_CAREERS_COURSE_X,
  ND_CAREERS_COURSE_Y,
} from "@/lib/constants";

type LocalMapProps = {
  onModalStateChange?: (isOpen: boolean) => void;
  isModalOpen: boolean;
  screenSize: { width: number; height: number };
  dsInnerScreenSize: { width: number; height: number };
  modalContainerRef?: React.RefObject<HTMLDivElement | null>;
};

export function LocalMap({
  onModalStateChange,
  isModalOpen,
  screenSize,
  dsInnerScreenSize,
  modalContainerRef,
}: LocalMapProps) {
  const localMapRef = useRef<HTMLDivElement>(null);
  const localMapWidth = LOCAL_MAP_PIXEL_WIDTH * LOCAL_MAP_SCALE;
  const localMapHeight = LOCAL_MAP_PIXEL_HEIGHT * LOCAL_MAP_SCALE;
  const [hoveredLocation, setHoveredLocation] = useState<HoverLocation | null>(
    null,
  );
  const [selectedLocation, setSelectedLocation] =
    useState<HOVER_LOCATION | null>(null);
  useEffect(() => {
    if (selectedLocation !== null) {
      onModalStateChange?.(true);
    }
    return () => {
      if (selectedLocation !== null) {
        onModalStateChange?.(false);
      }
    };
  }, [selectedLocation, onModalStateChange]);
  const duncanHallX = DUNCAN_HALL_X * LOCAL_MAP_SCALE;
  const duncanHallY = DUNCAN_HALL_Y * LOCAL_MAP_SCALE;
  const ndListensX = ND_LISTENS_X * LOCAL_MAP_SCALE;
  const ndListensY = ND_LISTENS_Y * LOCAL_MAP_SCALE;
  const goldenDomeX = GOLDEN_DOME_X * LOCAL_MAP_SCALE;
  const goldenDomeY = GOLDEN_DOME_Y * LOCAL_MAP_SCALE;
  const grottoX = GROTTO_X * LOCAL_MAP_SCALE;
  const grottoY = GROTTO_Y * LOCAL_MAP_SCALE;
  const ndCareersX = ND_CAREERS_COURSE_X * LOCAL_MAP_SCALE;
  const ndCareersY = ND_CAREERS_COURSE_Y * LOCAL_MAP_SCALE;
  const locationCoordinates: Partial<
    Record<HOVER_LOCATION, { x: number; y: number }>
  > = {
    [HOVER_LOCATION.DUNCAN_HALL]: {
      x: duncanHallX,
      y: duncanHallY,
    },
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
    [HOVER_LOCATION.ND_CAREERS_COURSE]: {
      x: ndCareersX,
      y: ndCareersY,
    },
  };
  return (
    <>
      <div
        ref={localMapRef}
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
          onClick={() => setSelectedLocation(HOVER_LOCATION.DUNCAN_HALL)}
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
          onClick={() => setSelectedLocation(HOVER_LOCATION.ND_LISTENS)}
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
          onClick={() => setSelectedLocation(HOVER_LOCATION.GOLDEN_DOME)}
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
          onClick={() => setSelectedLocation(HOVER_LOCATION.GROTTO)}
        >
          <GrottoLocalIcon />
        </div>
        <div
          className="absolute cursor-pointer"
          style={{
            left: ndCareersX,
            top: ndCareersY,
          }}
          onMouseEnter={() =>
            setHoveredLocation({
              location: HOVER_LOCATION.ND_CAREERS_COURSE,
              hover: true,
            })
          }
          onMouseLeave={() => setHoveredLocation(null)}
          onClick={() => setSelectedLocation(HOVER_LOCATION.ND_CAREERS_COURSE)}
        >
          <NdCareersCourseLocalIcon />
        </div>
        {hoveredLocation?.hover &&
          locationCoordinates[hoveredLocation.location] && (
            <LocationHoverPopup
              title={
                hoveredLocation.location.charAt(0).toUpperCase() +
                hoveredLocation.location.slice(1)
              }
              description={HoverConfig[hoveredLocation.location]}
              x={locationCoordinates[hoveredLocation.location]!.x}
              y={locationCoordinates[hoveredLocation.location]!.y}
              containerRef={modalContainerRef}
              localMapRef={localMapRef}
              iconWidth={LOCAL_ICON_SIZE * LOCAL_MAP_SCALE}
              iconHeight={LOCAL_ICON_SIZE * LOCAL_MAP_SCALE}
            />
          )}
      </div>
      {selectedLocation && (
        <LocationDescriptionModal
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
          isModalOpen={isModalOpen}
          screenSize={screenSize}
          dsInnerScreenSize={dsInnerScreenSize}
        />
      )}
    </>
  );
}
