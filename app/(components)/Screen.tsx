"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
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
import { getMapScaleAndPosition, getDsInnerScreenCenter } from "@lib/utils";

export function Screen() {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [modalCount, setModalCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isModalOpen = modalCount > 0;
  const handleModalStateChange = (isOpen: boolean) => {
    setModalCount((prev) => (isOpen ? prev + 1 : Math.max(0, prev - 1)));
  };
  const mapWidth = DS_PIXEL_WIDTH * DS_TO_WEB_SCALE;
  const mapHeight = DS_PIXEL_HEIGHT * DS_TO_WEB_SCALE;
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const img = containerRef.current.querySelector("img");
        if (img) {
          const rect = img.getBoundingClientRect();
          setImageSize({ width: img.offsetWidth, height: img.offsetHeight });
          setImagePosition({ x: rect.left, y: rect.top });
        }
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    window.addEventListener("scroll", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("scroll", updateSize);
    };
  }, []);
  const mapLayout =
    imageSize.width > 0 && imageSize.height > 0
      ? getMapScaleAndPosition(
          imageSize.width,
          imageSize.height,
          mapWidth,
          mapHeight,
          DS_SCREEN_CENTER_X_RATIO,
          DS_SCREEN_CENTER_Y_RATIO,
          DS_SCREEN_INNER_WIDTH_RATIO,
          DS_SCREEN_INNER_HEIGHT_RATIO,
        )
      : { scaleX: 1, scaleY: 1, x: 0, y: 0 };
  const dsInnerScreenSize = useMemo(
    () => ({
      width: imageSize.width * DS_SCREEN_INNER_WIDTH_RATIO,
      height: imageSize.height * DS_SCREEN_INNER_HEIGHT_RATIO,
    }),
    [imageSize.width, imageSize.height],
  );
  const dsInnerScreenCenter = useMemo(() => {
    if (imageSize.width === 0 || imageSize.height === 0) {
      return { x: 0, y: 0 };
    }
    const relativeCenter = getDsInnerScreenCenter(
      imageSize.width,
      imageSize.height,
      DS_SCREEN_CENTER_X_RATIO,
      DS_SCREEN_CENTER_Y_RATIO,
    );
    return {
      x: imagePosition.x + relativeCenter.x,
      y: imagePosition.y + relativeCenter.y,
    };
  }, [imageSize.width, imageSize.height, imagePosition.x, imagePosition.y]);
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
              const rect = img.getBoundingClientRect();
              setImageSize({
                width: img.offsetWidth,
                height: img.offsetHeight,
              });
              setImagePosition({ x: rect.left, y: rect.top });
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
          <Map
            onModalStateChange={handleModalStateChange}
            isModalOpen={isModalOpen}
            screenSize={imageSize}
            dsInnerScreenSize={dsInnerScreenSize}
            dsInnerScreenCenter={dsInnerScreenCenter}
          />
        </div>
      )}
    </div>
  );
}
