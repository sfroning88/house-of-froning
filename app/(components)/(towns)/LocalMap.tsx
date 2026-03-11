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
} from "@/lib/constants";

type LocalMapProps = {
  locations: TownLocationConfig[];
  mapImagePath: string;
  onModalStateChange?: (isOpen: boolean) => void;
};

export function LocalMap({
  locations,
  mapImagePath,
  onModalStateChange,
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
  }, [selectedLocation, onModalStateChange]);
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
      {locations.map((loc) => {
        const x = loc.x * LOCAL_MAP_SCALE;
        const y = loc.y * LOCAL_MAP_SCALE;
        return (
          <div
            key={loc.id}
            className="absolute cursor-pointer"
            style={{ left: x, top: y }}
            onClick={() => setSelectedLocation(loc.id)}
          >
            <LocalLocationIcon src={loc.imagePath} alt={loc.alt} />
          </div>
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
