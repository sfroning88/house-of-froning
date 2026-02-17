"use client";

type IconProps = {
    width?: number;
    height?: number;
};

export function Icon({ width, height }: IconProps) {
    const style =
        width != null && height != null
            ? { width, height }
            : undefined;
    return (
        <div
            className="w-8 h-8 bg-slate-200 border-2 border-slate-500 cursor-pointer hover:bg-slate-100 transition-colors"
            style={style}
        />
    );
}
