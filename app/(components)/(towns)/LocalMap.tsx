"use client";

import { useState, useEffect } from "react";
import { LocalLocationIcon } from "./LocalLocationIcon";
import { LocationDescriptionModal } from "./LocationDescriptionModal";
import { HOVER_LOCATION } from "@/lib/types";
import type { TownLocationConfig } from "@/lib/types";
import {
  LOCAL_MAP_PIXEL_WIDTH,
  LOCAL_MAP_PIXEL_HEIGHT,
  LOCAL_MAP_SCALE,
  LOCAL_ICON_SIZE,
} from "@/lib/constants";

type LocalMapProps = {
  locations: TownLocationConfig[];
  mapImagePath: string;
  onModalStateChange?: (isOpen: boolean) => void;
  isPin?: boolean;
};

export function LocalMap({
  locations,
  mapImagePath,
  onModalStateChange,
  isPin = false,
}: LocalMapProps) {
  const localMapWidth = LOCAL_MAP_PIXEL_WIDTH * LOCAL_MAP_SCALE;
  const localMapHeight = LOCAL_MAP_PIXEL_HEIGHT * LOCAL_MAP_SCALE;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation]);
  return (
    <div
      className="relative border-2 border-iceberg-medium bg-cover bg-center bg-no-repeat"
      style={{
        width: localMapWidth,
        height: localMapHeight,
        aspectRatio: `${LOCAL_MAP_PIXEL_WIDTH} / ${LOCAL_MAP_PIXEL_HEIGHT}`,
        backgroundImage: `url(${mapImagePath})`,
      }}
    >
      {locations.map((loc, index) => {
        const pinSize = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE;
        const column = index % 3;
        const row = Math.floor(index / 3);
        const x = isPin
          ? column * (localMapWidth / 3) + (localMapWidth / 3 - pinSize) / 2
          : loc.x * LOCAL_MAP_SCALE;
        const y = isPin
          ? row * (localMapHeight / 3) + (localMapHeight / 3 - pinSize) / 2
          : loc.y * LOCAL_MAP_SCALE;
        const lavaPhase = (9 - (index % 9)) % 9;
        return (
          <button
            type="button"
            key={loc.id}
            className="absolute cursor-pointer border-0 bg-transparent p-0"
            style={{ left: x, top: y }}
            onClick={() => setSelectedLocation(loc.id)}
            aria-label={loc.alt}
          >
            {isPin ? (
              <span
                className="lava-pin pointer-events-none"
                style={{
                  width: pinSize,
                  height: pinSize,
                  fontSize: pinSize * 0.45,
                  ["--lava-phase" as string]: lavaPhase,
                }}
              >
                <span className="relative z-10">{index + 1}</span>
              </span>
            ) : (
              <LocalLocationIcon src={loc.imagePath} alt={loc.alt} />
            )}
          </button>
        );
      })}
      {selectedLocation && (
        <LocationDescriptionModal
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  );
}
