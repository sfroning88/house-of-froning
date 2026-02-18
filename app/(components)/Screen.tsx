"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Map } from "./Map";
import { 
    DS_IMAGE_PATH, 
    DS_PIXEL_WIDTH, 
    DS_PIXEL_HEIGHT, 
    DS_TO_WEB_SCALE,
    DS_SCREEN_CENTER_X_RATIO,
    DS_SCREEN_CENTER_Y_RATIO,
    DS_SCREEN_INNER_WIDTH_RATIO,
    DS_SCREEN_INNER_HEIGHT_RATIO,
} from "@/lib/constants";
import { getMapScaleAndPosition } from "@lib/utils";

export function Screen() {
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const mapWidth = DS_PIXEL_WIDTH * DS_TO_WEB_SCALE;
    const mapHeight = DS_PIXEL_HEIGHT * DS_TO_WEB_SCALE;
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const img = containerRef.current.querySelector("img");
                if (img) {
                    setImageSize({ width: img.offsetWidth, height: img.offsetHeight });
                }
            }
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    const mapLayout = imageSize.width > 0 && imageSize.height > 0
        ? getMapScaleAndPosition(
            imageSize.width,
            imageSize.height,
            mapWidth,
            mapHeight,
            DS_SCREEN_CENTER_X_RATIO,
            DS_SCREEN_CENTER_Y_RATIO,
            DS_SCREEN_INNER_WIDTH_RATIO,
            DS_SCREEN_INNER_HEIGHT_RATIO
        )
        : { scaleX: 1, scaleY: 1, x: 0, y: 0 };
    return (
        <div ref={containerRef} className="relative">
            <Image
                src={DS_IMAGE_PATH}
                alt="DS Screen"
                width={1200}
                height={800}
                className="w-auto h-auto max-w-full"
                priority
                onLoad={() => {
                    if (containerRef.current) {
                        const img = containerRef.current.querySelector("img");
                        if (img) {
                            setImageSize({ width: img.offsetWidth, height: img.offsetHeight });
                        }
                    }
                }}
            />
            {imageSize.width > 0 && (
                <div
                    className="absolute"
                    style={{
                        left: `${mapLayout.x}px`,
                        top: `${mapLayout.y}px`,
                        transform: `scaleX(${mapLayout.scaleX}) scaleY(${mapLayout.scaleY})`,
                        transformOrigin: "top left",
                    }}
                >
                    <Map />
                </div>
            )}
        </div>
    );
}
