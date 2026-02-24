"use client";

import { useState } from "react";
import { DollarSign, IdCard } from "lucide-react";
import { TrainerCard } from "./(bottom)/TrainerCard";

type BottomBarProps = {
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  bottomBarLayout: { x: number; y: number; width: number };
};

export function BottomBar({
  onModalStateChange,
  dsInnerScreenSize,
  dsInnerScreenCenter,
  bottomBarLayout,
}: BottomBarProps) {
  const [isTrainerCardOpen, setIsTrainerCardOpen] = useState(false);
  const handleTrainerCardToggle = () => {
    setIsTrainerCardOpen((prev) => !prev);
  };
  const handleTrainerCardStateChange = (isOpen: boolean) => {
    setIsTrainerCardOpen(isOpen);
    onModalStateChange?.(isOpen);
  };
  if (bottomBarLayout.width === 0) {
    return null;
  }
  return (
    <>
      <div
        className="absolute bg-slate-700 border-t-2 border-slate-500 flex items-center justify-around py-3 z-30"
        style={{
          left: `${bottomBarLayout.x}px`,
          top: `${bottomBarLayout.y}px`,
          width: `${bottomBarLayout.width}px`,
        }}
      >
        <button
          onClick={handleTrainerCardToggle}
          className="flex items-center justify-center w-12 h-12 bg-slate-600 hover:bg-slate-500 rounded border border-slate-400 transition-colors"
          aria-label="Trainer Card"
        >
          <IdCard className="w-6 h-6 text-white" />
        </button>
        <button
          className="flex items-center justify-center w-12 h-12 bg-slate-600 rounded border border-slate-400"
          aria-label="Placeholder"
          disabled
        >
          <DollarSign className="w-6 h-6 text-white" />
        </button>
        <button
          className="flex items-center justify-center w-12 h-12 bg-slate-600 rounded border border-slate-400"
          aria-label="Placeholder"
          disabled
        >
          <DollarSign className="w-6 h-6 text-white" />
        </button>
        <button
          className="flex items-center justify-center w-12 h-12 bg-slate-600 rounded border border-slate-400"
          aria-label="Placeholder"
          disabled
        >
          <DollarSign className="w-6 h-6 text-white" />
        </button>
      </div>
      {isTrainerCardOpen && (
        <TrainerCard
          onModalStateChange={handleTrainerCardStateChange}
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          onClose={() => handleTrainerCardStateChange(false)}
        />
      )}
    </>
  );
}
