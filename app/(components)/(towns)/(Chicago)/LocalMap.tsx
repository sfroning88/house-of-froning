"use client";

import { useState, useEffect, useRef } from "react";
import { SeansHouseLocalIcon } from "./SeansHouse";
import { ChicagoWarriorsBaseballClubLocalIcon } from "./ChicagoWarriorsBaseballClub";
import { RowanLabsLocalIcon } from "./RowanLabs";
import { SaintAlphonsusAcademyLocalIcon } from "./SaintAlphonsusAcademy";
import { LocationHoverPopup } from "./LocationHoverPopup";
import { LocationDescriptionModal } from "./LocationDescriptionModal";
import { HOVER_LOCATION, HoverLocation, HoverConfig } from "@/lib/types";
import {
  LOCAL_MAP_PIXEL_WIDTH,
  LOCAL_MAP_PIXEL_HEIGHT,
  LOCAL_MAP_SCALE,
  LOCAL_ICON_SIZE,
  SEANS_HOUSE_X,
  SEANS_HOUSE_Y,
  SAINT_ALPHONSUS_ACADEMY_X,
  SAINT_ALPHONSUS_ACADEMY_Y,
  CHICAGO_WARRIORS_BASEBALL_CLUB_X,
  CHICAGO_WARRIORS_BASEBALL_CLUB_Y,
  ROWAN_LABS_X,
  ROWAN_LABS_Y,
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
  const [selectedLocation, setSelectedLocation] = useState<HOVER_LOCATION | null>(
    null,
  );
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
  const seansHouseX = SEANS_HOUSE_X * LOCAL_MAP_SCALE;
  const seansHouseY = SEANS_HOUSE_Y * LOCAL_MAP_SCALE;
  const saintAlphonsusX = SAINT_ALPHONSUS_ACADEMY_X * LOCAL_MAP_SCALE;
  const saintAlphonsusY = SAINT_ALPHONSUS_ACADEMY_Y * LOCAL_MAP_SCALE;
  const warriorsX = CHICAGO_WARRIORS_BASEBALL_CLUB_X * LOCAL_MAP_SCALE;
  const warriorsY = CHICAGO_WARRIORS_BASEBALL_CLUB_Y * LOCAL_MAP_SCALE;
  const rowanLabsX = ROWAN_LABS_X * LOCAL_MAP_SCALE;
  const rowanLabsY = ROWAN_LABS_Y * LOCAL_MAP_SCALE;
  const locationCoordinates: Partial<
    Record<HOVER_LOCATION, { x: number; y: number }>
  > = {
    [HOVER_LOCATION.SEANS_HOUSE]: {
      x: seansHouseX,
      y: seansHouseY,
    },
    [HOVER_LOCATION.SAINT_ALPHONSUS_ACADEMY]: {
      x: saintAlphonsusX,
      y: saintAlphonsusY,
    },
    [HOVER_LOCATION.CHICAGO_WARRIORS_BASEBALL_CLUB]: {
      x: warriorsX,
      y: warriorsY,
    },
    [HOVER_LOCATION.ROWAN_LABS]: {
      x: rowanLabsX,
      y: rowanLabsY,
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
          onClick={() => setSelectedLocation(HOVER_LOCATION.SEANS_HOUSE)}
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
          onClick={() =>
            setSelectedLocation(HOVER_LOCATION.SAINT_ALPHONSUS_ACADEMY)
          }
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
          onClick={() =>
            setSelectedLocation(HOVER_LOCATION.CHICAGO_WARRIORS_BASEBALL_CLUB)
          }
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
          onClick={() => setSelectedLocation(HOVER_LOCATION.ROWAN_LABS)}
        >
          <RowanLabsLocalIcon />
        </div>
        {hoveredLocation?.hover &&
          (() => {
            const coordinates = locationCoordinates[hoveredLocation.location];
            if (!coordinates) return null;
            return (
              <LocationHoverPopup
                title={
                  hoveredLocation.location.charAt(0).toUpperCase() +
                  hoveredLocation.location.slice(1)
                }
                description={HoverConfig[hoveredLocation.location]}
                x={coordinates.x}
                y={coordinates.y}
                containerRef={modalContainerRef}
                localMapRef={localMapRef}
                iconWidth={LOCAL_ICON_SIZE * LOCAL_MAP_SCALE}
                iconHeight={LOCAL_ICON_SIZE * LOCAL_MAP_SCALE}
              />
            );
          })()}
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
