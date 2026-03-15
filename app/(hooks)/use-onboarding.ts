"use client";

import { useCallback, useState } from "react";
import { ONBOARDING_STEP_KEY } from "@/lib/constants";

export function useOnboarding() {
  const [step, setStep] = useState<number>(() =>
    typeof window !== "undefined"
      ? Number(localStorage.getItem(ONBOARDING_STEP_KEY) || 0)
      : 0,
  );
  const advanceToStep = useCallback((target: number) => {
    setStep((prev) => {
      const next = Math.max(prev, target);
      if (typeof window !== "undefined") {
        localStorage.setItem(ONBOARDING_STEP_KEY, String(next));
      }
      return next;
    });
  }, []);
  return { step, advanceToStep };
}
