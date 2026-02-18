"use client";

import { useCallback, useState } from "react";
import { Chicago, NotreDame } from "./(towns)";
import { getTownCenter } from "@lib/utils";
import { TOWN_ID, TownConfig } from "@lib/types";
import { Avatar } from "./Avatar";
import {
  DS_PIXEL_WIDTH,
  DS_PIXEL_HEIGHT,
  DS_TO_WEB_SCALE,
  MAP_AVATAR_DEFAULT_X,
  MAP_AVATAR_DEFAULT_Y,
} from "@/lib/constants";

type MapProps = {
  onModalStateChange: (isOpen: boolean) => void;
  isModalOpen: boolean;
  screenSize: { width: number; height: number };
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
};

export function Map({
  onModalStateChange,
  isModalOpen,
  screenSize,
  dsInnerScreenSize,
  dsInnerScreenCenter,
}: MapProps) {
  const mapWidth = DS_PIXEL_WIDTH * DS_TO_WEB_SCALE;
  const mapHeight = DS_PIXEL_HEIGHT * DS_TO_WEB_SCALE;
  const defaultAvatarPosition = {
    x: MAP_AVATAR_DEFAULT_X,
    y: MAP_AVATAR_DEFAULT_Y,
  };
  const [avatarTownId, setAvatarTownId] = useState<TOWN_ID | null>(null);
  const onVisitTown = useCallback((townId: TOWN_ID) => {
    setAvatarTownId(townId);
  }, []);
  const avatarPosition =
    avatarTownId != null ? getTownCenter(avatarTownId) : defaultAvatarPosition;
  return (
    <div
      className="relative bg-iceberg-deep/80 border-4 border-iceberg-medium"
      style={{
        width: mapWidth,
        height: mapHeight,
        aspectRatio: `${DS_PIXEL_WIDTH} / ${DS_PIXEL_HEIGHT}`,
      }}
    >
      <div
        className="absolute"
        style={{
          left: TownConfig[TOWN_ID.CHICAGO].x * DS_TO_WEB_SCALE,
          top: TownConfig[TOWN_ID.CHICAGO].y * DS_TO_WEB_SCALE,
        }}
      >
        <Chicago
          onVisitTown={() => onVisitTown(TOWN_ID.CHICAGO)}
          onModalStateChange={onModalStateChange}
          isModalOpen={isModalOpen}
          screenSize={screenSize}
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
        />
      </div>
      <div
        className="absolute"
        style={{
          left: TownConfig[TOWN_ID.NOTRE_DAME].x * DS_TO_WEB_SCALE,
          top: TownConfig[TOWN_ID.NOTRE_DAME].y * DS_TO_WEB_SCALE,
        }}
      >
        <NotreDame
          onVisitTown={() => onVisitTown(TOWN_ID.NOTRE_DAME)}
          onModalStateChange={onModalStateChange}
          isModalOpen={isModalOpen}
          screenSize={screenSize}
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
        />
      </div>
      <Avatar position={avatarPosition} isBlinking={true} />
    </div>
  );
}
