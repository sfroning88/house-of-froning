"use client";

import { Town } from "./Town";
import { TOWN_ID } from "@/lib/types";
import { TownConfig } from "@/lib/types";
import { townContentConfigs } from "@/lib/towns";
import { TEST_IDS } from "@/lib/test-ids";

type ChicagoProps = {
  onVisitTown?: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  mapCenter: { x: number; y: number };
};

export function Chicago({
  onVisitTown,
  onModalStateChange,
  dsInnerScreenSize,
  dsInnerScreenCenter,
  mapCenter,
}: ChicagoProps) {
  return (
    <Town
      contentConfig={townContentConfigs[TOWN_ID.CHICAGO]}
      mapConfig={TownConfig[TOWN_ID.CHICAGO]}
      townTestId={TEST_IDS.townChicago}
      townModalTestId={TEST_IDS.townModalChicago}
      onVisitTown={onVisitTown}
      onModalStateChange={onModalStateChange}
      dsInnerScreenSize={dsInnerScreenSize}
      dsInnerScreenCenter={dsInnerScreenCenter}
      mapCenter={mapCenter}
    />
  );
}
