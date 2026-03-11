"use client";

import { useSyncExternalStore, useState } from "react";
import { createPortal } from "react-dom";
import posthog from "posthog-js";
import { useMediaQuery } from "@/app/(hooks)/use-media-query";
import {
  COOKIE_BANNER_DISMISSED_KEY,
  COOKIE_BANNER_MESSAGE,
  MOBILE_BREAKPOINT,
} from "@/lib/constants";

function getDismissedSnapshot(): boolean {
  if (typeof localStorage === "undefined") return true;
  return localStorage.getItem(COOKIE_BANNER_DISMISSED_KEY) === "true";
}

const emptySubscribe = () => () => {};

export function CookieBanner() {
  const isMobile = !useMediaQuery(`(min-width: ${MOBILE_BREAKPOINT}px)`, true);
  const isDismissed = useSyncExternalStore(
    emptySubscribe,
    getDismissedSnapshot,
    () => true,
  );
  const [localDismissed, setLocalDismissed] = useState(false);
  const handleDismiss = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(COOKIE_BANNER_DISMISSED_KEY, "true");
    }
    posthog.capture("cookie_banner_dismissed");
    setLocalDismissed(true);
  };
  const effectiveDismissed = localDismissed || isDismissed;
  if (effectiveDismissed) {
    return null;
  }
  const banner = (
    <div
      className={`fixed bottom-4 right-4 z-40 flex flex-col gap-2 bg-white border-4 border-slate-400 shadow-lg animate-slide-in-right ${
        isMobile
          ? "max-w-[calc(100vw-2rem)] p-3 text-xs"
          : "max-w-sm p-4 text-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h2
          className={`font-semibold text-slate-800 shrink-0 ${
            isMobile ? "text-sm" : "text-base"
          }`}
        >
          Cookie notice
        </h2>
        <button
          onClick={handleDismiss}
          className="text-slate-600 hover:text-slate-800 leading-none shrink-0"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
      <p className="text-slate-700">{COOKIE_BANNER_MESSAGE}</p>
    </div>
  );
  return typeof window !== "undefined"
    ? createPortal(banner, document.body)
    : null;
}
