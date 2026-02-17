"use client";

import { useCallback, useState } from "react";
import { Chicago } from "./(towns)";
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

export function Map() {
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
        <Chicago onVisitTown={() => onVisitTown(TOWN_ID.CHICAGO)} />
      </div>
      <Avatar position={avatarPosition} isBlinking={true} />
    </div>
  );
}
