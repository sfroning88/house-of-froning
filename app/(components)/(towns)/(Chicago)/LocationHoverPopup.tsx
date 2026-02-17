"use client";

type LocationHoverPopupProps = {
  title: string;
  description: string;
  x: number;
  y: number;
};

export function LocationHoverPopup({
  title,
  description,
  x,
  y,
}: LocationHoverPopupProps) {
  return (
    <div
      className="absolute bg-white border-2 border-slate-400 p-3 shadow-lg z-50 pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -100%)",
        marginTop: -8,
        minWidth: 200,
        maxWidth: 300,
      }}
    >
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-xs text-slate-600">{description}</p>
    </div>
  );
}
