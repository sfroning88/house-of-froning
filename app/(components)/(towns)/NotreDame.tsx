"use client";

import { Town } from "./Town";
import { TOWN_ID } from "@/lib/types";
import { TownConfig } from "@/lib/types";
import { townContentConfigs } from "@/lib/towns";
import { TEST_IDS } from "@/lib/test-ids";

type NotreDameProps = {
  onVisitTown?: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  mapCenter: { x: number; y: number };
};

export function NotreDame({
  onVisitTown,
  onModalStateChange,
  dsInnerScreenSize,
  dsInnerScreenCenter,
  mapCenter,
}: NotreDameProps) {
  return (
    <Town
      contentConfig={townContentConfigs[TOWN_ID.NOTRE_DAME]}
      mapConfig={TownConfig[TOWN_ID.NOTRE_DAME]}
      townTestId={TEST_IDS.townNotreDame}
      townModalTestId={TEST_IDS.townModalNotreDame}
      onVisitTown={onVisitTown}
      onModalStateChange={onModalStateChange}
      dsInnerScreenSize={dsInnerScreenSize}
      dsInnerScreenCenter={dsInnerScreenCenter}
      mapCenter={mapCenter}
    />
  );
}
