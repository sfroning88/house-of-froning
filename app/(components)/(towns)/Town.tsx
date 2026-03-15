"use client";

import { useState, useEffect } from "react";
import posthog from "posthog-js";
import { POSTHOG_EVENTS } from "@/lib/events";
import { toast } from "sonner";
import { useOnboardingContext } from "@/app/providers";
import { TownIcon } from "./TownIcon";
import { TownDescription } from "./TownDescription";
import { TownContentConfig, TownConfigEntry } from "@/lib/types";
import { CLICK_ICONS_MESSAGE, DS_TO_WEB_SCALE } from "@/lib/constants";

type TownProps = {
  contentConfig: TownContentConfig;
  mapConfig: TownConfigEntry;
  onVisitTown?: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  mapCenter: { x: number; y: number };
};

export function Town({
  contentConfig,
  mapConfig,
  onVisitTown,
  onModalStateChange,
  dsInnerScreenSize,
  mapCenter,
}: TownProps) {
  const onboarding = useOnboardingContext();
  const iconWidth = mapConfig.width * DS_TO_WEB_SCALE;
  const iconHeight = mapConfig.height * DS_TO_WEB_SCALE;
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    onModalStateChange?.(isOpen);
  }, [isOpen, onModalStateChange]);
  const closeModal = () => {
    posthog.capture(POSTHOG_EVENTS.town_closed, {
      town_title: contentConfig.title,
    });
    if (onboarding && onboarding.step === 1) {
      toast(CLICK_ICONS_MESSAGE, { id: "onboarding-1" });
      onboarding.advanceToStep(2);
    }
    setIsOpen(false);
    onVisitTown?.();
  };
  return (
    <div className="relative">
      <button
        onClick={() => {
          const next = !isOpen;
          setIsOpen(next);
          if (next) {
            posthog.capture(POSTHOG_EVENTS.town_opened, {
              town_title: contentConfig.title,
            });
            if (onboarding && onboarding.step === 0) {
              onboarding.advanceToStep(1);
            }
          }
        }}
      >
        <TownIcon width={iconWidth} height={iconHeight} />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeModal}
          />
          <TownDescription
            config={contentConfig}
            onModalStateChange={onModalStateChange}
            onClose={closeModal}
            dsInnerScreenSize={dsInnerScreenSize}
            mapCenter={mapCenter}
          />
        </>
      )}
    </div>
  );
}
