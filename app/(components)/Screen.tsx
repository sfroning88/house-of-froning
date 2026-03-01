"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import { Map } from "./Map";
import { BottomBar } from "./Bottom";
import { useMediaQuery } from "@/app/(hooks)/use-media-query";
import {
  DS_IMAGE_PATH,
  DS_PIXEL_WIDTH,
  DS_PIXEL_HEIGHT,
  DS_TO_WEB_SCALE,
  DS_IMAGE_FILE_WIDTH,
  DS_IMAGE_FILE_HEIGHT,
  DS_ASPECT_RATIO,
  DS_SCREEN_CENTER_X_RATIO,
  DS_SCREEN_CENTER_Y_RATIO,
  DS_SCREEN_INNER_WIDTH_RATIO,
  DS_SCREEN_INNER_HEIGHT_RATIO,
  DS_BOTTOM_BAR_HEIGHT_RATIO,
  MOBILE_BREAKPOINT,
  DS_FRAME_MIN_WIDTH,
} from "@/lib/constants";
import { getMapScaleAndPosition, getDsInnerScreenCenter } from "@lib/utils";

export function Screen() {
  const isDesktop = useMediaQuery(`(min-width: ${MOBILE_BREAKPOINT}px)`, true);
  const [frameRect, setFrameRect] = useState<DOMRect | null>(null);
  const [modalCount, setModalCount] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const isModalOpen = modalCount > 0;
  const handleModalStateChange = (isOpen: boolean) => {
    setModalCount((prev) => (isOpen ? prev + 1 : Math.max(0, prev - 1)));
  };
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.target.getBoundingClientRect();
      if (rect) setFrameRect(rect);
    });
    observer.observe(el);
    setFrameRect(el.getBoundingClientRect());
    return () => observer.disconnect();
  }, [isDesktop]);
  useEffect(() => {
    if (!frameRef.current) return;
    const scrollHandler = () => {
      if (frameRef.current) {
        setFrameRect(frameRef.current.getBoundingClientRect());
      }
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);
  const mapWidth = DS_PIXEL_WIDTH * DS_TO_WEB_SCALE;
  const mapHeight = DS_PIXEL_HEIGHT * DS_TO_WEB_SCALE;
  const mapLayout = useMemo(() => {
    if (!frameRect || frameRect.width === 0 || frameRect.height === 0) {
      return { scaleX: 1, scaleY: 1, x: 0, y: 0 };
    }
    const adjustedInnerHeightRatio =
      DS_SCREEN_INNER_HEIGHT_RATIO - DS_BOTTOM_BAR_HEIGHT_RATIO;
    return getMapScaleAndPosition(
      frameRect.width,
      frameRect.height,
      mapWidth,
      mapHeight,
      DS_SCREEN_CENTER_X_RATIO,
      DS_SCREEN_CENTER_Y_RATIO,
      DS_SCREEN_INNER_WIDTH_RATIO,
      adjustedInnerHeightRatio,
    );
  }, [frameRect, mapWidth, mapHeight]);
  const dsInnerScreenSize = useMemo(() => {
    if (!frameRect) return { width: 0, height: 0 };
    return {
      width: frameRect.width * DS_SCREEN_INNER_WIDTH_RATIO,
      height: frameRect.height * DS_SCREEN_INNER_HEIGHT_RATIO,
    };
  }, [frameRect]);
  const dsInnerScreenCenter = useMemo(() => {
    if (!frameRect) return { x: 0, y: 0 };
    const relativeCenter = getDsInnerScreenCenter(
      frameRect.width,
      frameRect.height,
      DS_SCREEN_CENTER_X_RATIO,
      DS_SCREEN_CENTER_Y_RATIO,
    );
    return {
      x: frameRect.left + relativeCenter.x,
      y: frameRect.top + relativeCenter.y,
    };
  }, [frameRect]);
  const mapCenter = useMemo(() => {
    if (!frameRect || frameRect.width === 0 || frameRect.height === 0)
      return { x: 0, y: 0 };
    if (mapLayout.scaleX === 0) return { x: 0, y: 0 };
    const scaledMapWidth = mapWidth * mapLayout.scaleX;
    const scaledMapHeight = mapHeight * mapLayout.scaleY;
    return {
      x: frameRect.left + mapLayout.x + scaledMapWidth / 2,
      y: frameRect.top + mapLayout.y + scaledMapHeight / 2,
    };
  }, [frameRect, mapLayout, mapWidth, mapHeight]);
  const hasLayout = frameRect && frameRect.width > 0 && frameRect.height > 0;
  return (
    <div
      className={
        isDesktop
          ? "relative flex min-h-screen w-full items-center justify-center"
          : "flex min-h-screen w-full flex-col overflow-y-auto"
      }
    >
      <div
        ref={frameRef}
        className="relative w-full max-w-full shrink-0"
        style={{
          aspectRatio: `${DS_IMAGE_FILE_WIDTH} / ${DS_IMAGE_FILE_HEIGHT}`,
          minWidth: DS_FRAME_MIN_WIDTH,
          maxWidth: isDesktop
            ? "min(95vw, 135svh)"
            : `min(100vw, ${DS_ASPECT_RATIO * 100}vh)`,
          maxHeight: isDesktop ? "min(90svh, 63.34vw)" : undefined,
        }}
      >
        <Image
          src={DS_IMAGE_PATH}
          alt="DS Screen"
          width={DS_IMAGE_FILE_WIDTH}
          height={DS_IMAGE_FILE_HEIGHT}
          className="h-full w-full object-contain"
          style={{
            aspectRatio: `${DS_IMAGE_FILE_WIDTH} / ${DS_IMAGE_FILE_HEIGHT}`,
          }}
          priority
        />
        {hasLayout && (
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
              screenSize={{ width: frameRect.width, height: frameRect.height }}
              dsInnerScreenSize={dsInnerScreenSize}
              dsInnerScreenCenter={dsInnerScreenCenter}
              mapCenter={mapCenter}
            />
            <BottomBar
              onModalStateChange={handleModalStateChange}
              dsInnerScreenSize={dsInnerScreenSize}
              dsInnerScreenCenter={dsInnerScreenCenter}
              bottomBarLayout={{
                left: 0,
                top: mapHeight,
                width: mapWidth,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
