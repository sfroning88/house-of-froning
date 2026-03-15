"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import posthog from "posthog-js";
import { toast } from "sonner";
import { useOnboarding } from "@/app/(hooks)/use-onboarding";
import {
  SEE_SOURCE_CODE_LINK,
  SEE_SOURCE_CODE_MESSAGE,
  SEE_SOURCE_CODE_WAIT,
  SOURCE_TOAST_SHOWN_KEY,
} from "@/lib/constants";
import { POSTHOG_EVENTS } from "@/lib/events";

type OnboardingContextValue = ReturnType<typeof useOnboarding>;

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function useOnboardingContext() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) return null;
  return ctx;
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const value = useOnboarding();
  useEffect(() => {
    const id = setTimeout(() => {
      if (typeof window === "undefined") return;
      if (sessionStorage.getItem(SOURCE_TOAST_SHOWN_KEY)) return;
      sessionStorage.setItem(SOURCE_TOAST_SHOWN_KEY, "1");
      toast(SEE_SOURCE_CODE_MESSAGE, {
        id: "onboarding-source",
        duration: Infinity,
        action: {
          label: "View Source Code",
          onClick: () => {
            posthog.capture(POSTHOG_EVENTS.view_source_code_clicked);
            window.open(SEE_SOURCE_CODE_LINK, "_blank");
          },
        },
      });
    }, SEE_SOURCE_CODE_WAIT);
    return () => clearTimeout(id);
  }, []);
  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}
