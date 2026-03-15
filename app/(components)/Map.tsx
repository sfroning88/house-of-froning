"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useOnboardingContext } from "@/app/providers";
import { Chicago } from "./(towns)/Chicago";
import { NotreDame } from "./(towns)/NotreDame";
import { getTownCenter } from "@lib/utils";
import { TOWN_ID, TownConfig } from "@lib/types";
import { Avatar } from "./Avatar";
import {
  DS_PIXEL_WIDTH,
  DS_PIXEL_HEIGHT,
  DS_TO_WEB_SCALE,
  MAP_AVATAR_DEFAULT_X,
  MAP_AVATAR_DEFAULT_Y,
  MAP_IMAGE_PATH,
  CLICK_TOWN_MESSAGE,
  ONBOARDING_STEP_DURATION,
} from "@/lib/constants";

type MapProps = {
  onModalStateChange: (isOpen: boolean) => void;
  isModalOpen: boolean;
  screenSize: { width: number; height: number };
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  mapCenter: { x: number; y: number };
};

export function Map({
  onModalStateChange,
  dsInnerScreenSize,
  dsInnerScreenCenter,
  mapCenter,
}: MapProps) {
  const onboarding = useOnboardingContext();
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
  useEffect(() => {
    if (onboarding?.step === 0) {
      toast(CLICK_TOWN_MESSAGE, {
        duration: ONBOARDING_STEP_DURATION,
        id: "onboarding-0",
      });
    }
  }, [onboarding?.step]);
  const avatarPosition =
    avatarTownId != null ? getTownCenter(avatarTownId) : defaultAvatarPosition;
  return (
    <div
      className="relative border-4 border-iceberg-medium bg-cover bg-center bg-no-repeat"
      style={{
        width: mapWidth,
        height: mapHeight,
        aspectRatio: `${DS_PIXEL_WIDTH} / ${DS_PIXEL_HEIGHT}`,
        backgroundImage: `url(${MAP_IMAGE_PATH})`,
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
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          mapCenter={mapCenter}
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
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          mapCenter={mapCenter}
        />
      </div>
      <Avatar position={avatarPosition} isBlinking={true} />
    </div>
  );
}
