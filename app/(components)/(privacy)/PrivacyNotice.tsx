"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import { useGetPrivacyContent } from "@/app/(hooks)/use-get-privacy-content";

export function PrivacyNotice() {
  const [isOpen, setIsOpen] = useState(false);
  const { content, isLoading } = useGetPrivacyContent(isOpen);
  const modalContent = isOpen ? (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-slate-400 p-6 shadow-lg z-50 flex flex-col gap-4 overflow-auto transition-all duration-300 max-w-2xl max-h-[80vh] w-[90vw]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Privacy Policy</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-600 hover:text-slate-800 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="text-sm overflow-auto flex-1 prose prose-sm max-w-none">
          {isLoading ? "Loading..." : <ReactMarkdown>{content}</ReactMarkdown>}
        </div>
      </div>
    </>
  ) : null;
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-white border-2 border-slate-400 px-4 py-2 text-sm shadow-lg hover:bg-slate-50 z-30"
      >
        Privacy Policy
      </button>
      {typeof window !== "undefined" && modalContent
        ? createPortal(modalContent, document.body)
        : modalContent}
    </>
  );
}
