"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import posthog from "posthog-js";
import ReactMarkdown from "react-markdown";
import { useMediaQuery } from "@/app/(hooks)/use-media-query";
import { MOBILE_BREAKPOINT } from "@/lib/constants";
import { POSTHOG_EVENTS } from "@/lib/events";
import { useGetPrivacyContent } from "@/app/(hooks)/use-get-privacy-content";

export function PrivacyNotice() {
  const isMobile = !useMediaQuery(`(min-width: ${MOBILE_BREAKPOINT}px)`, true);
  const [isOpen, setIsOpen] = useState(false);
  const { content, isLoading } = useGetPrivacyContent(isOpen);
  const handleOpen = () => {
    setIsOpen(true);
    posthog.capture(POSTHOG_EVENTS.privacy_policy_opened);
  };
  const handleClose = () => {
    setIsOpen(false);
    posthog.capture(POSTHOG_EVENTS.privacy_policy_closed);
  };
  const modalContent = isOpen ? (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-slate-400 shadow-lg z-50 flex flex-col gap-4 overflow-hidden transition-all duration-300 max-w-2xl max-h-[80vh] w-[90vw]"
        style={{ padding: isMobile ? "0.75rem" : "1.5rem" }}
      >
        <div className="flex items-center justify-between flex-shrink-0">
          <h2
            className={`font-semibold truncate ${isMobile ? "text-base" : "text-xl"}`}
          >
            Privacy Policy
          </h2>
          <button
            onClick={handleClose}
            className={`text-slate-600 hover:text-slate-800 leading-none ${isMobile ? "text-xl" : "text-2xl"}`}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div
          className={`overflow-auto flex-1 prose max-w-none min-w-0 ${
            isMobile
              ? "text-xs prose-sm prose-p:text-xs prose-li:text-xs prose-headings:text-sm"
              : "text-sm prose-sm"
          }`}
        >
          {isLoading ? (
            <span className={isMobile ? "text-xs" : "text-sm"}>Loading...</span>
          ) : (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
        </div>
      </div>
    </>
  ) : null;
  return (
    <>
      <button
        onClick={handleOpen}
        className={`fixed bottom-4 right-4 bg-white border-2 border-slate-400 shadow-lg hover:bg-slate-50 z-30 ${
          isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
        }`}
      >
        Privacy Policy
      </button>
      {typeof window !== "undefined" && modalContent
        ? createPortal(modalContent, document.body)
        : modalContent}
    </>
  );
}
