"use client";

import { Town } from "./Town";
import { TOWN_ID } from "@/lib/types";
import { TownConfig } from "@/lib/types";
import { townContentConfigs } from "@/lib/towns";
import { TEST_IDS } from "@/lib/test-ids";

type FierySpiritProps = {
  onVisitTown?: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  mapCenter: { x: number; y: number };
};

export function FierySpirit({
  onVisitTown,
  onModalStateChange,
  dsInnerScreenSize,
  dsInnerScreenCenter,
  mapCenter,
}: FierySpiritProps) {
  return (
    <Town
      contentConfig={townContentConfigs[TOWN_ID.FIERY_SPIRIT]}
      mapConfig={TownConfig[TOWN_ID.FIERY_SPIRIT]}
      townTestId={TEST_IDS.townFierySpirit}
      townModalTestId={TEST_IDS.townModalFierySpirit}
      onVisitTown={onVisitTown}
      onModalStateChange={onModalStateChange}
      dsInnerScreenSize={dsInnerScreenSize}
      dsInnerScreenCenter={dsInnerScreenCenter}
      mapCenter={mapCenter}
    />
  );
}
