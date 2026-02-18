"use client";

import { type RefObject, useRef, useCallback } from "react";
import {
  LOCATION_HOVER_POPUP_MIN_WIDTH,
  LOCATION_HOVER_POPUP_MAX_WIDTH,
  MODAL_CONTAINER_PADDING,
  LOCAL_ICON_SIZE,
  LOCAL_MAP_SCALE,
} from "@/lib/constants";
import { CORNER } from "@/lib/types";
import {
  getClosestCornerToCenter,
  getPopupAnchorPosition,
} from "@/lib/utils";

type LocationHoverPopupProps = {
  title: string;
  description: string;
  x: number;
  y: number;
  containerRef?: RefObject<HTMLDivElement | null>;
  localMapRef?: RefObject<HTMLDivElement | null>;
  iconWidth?: number;
  iconHeight?: number;
};

export function LocationHoverPopup({
  title,
  description,
  x,
  y,
  containerRef,
  localMapRef,
  iconWidth = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE,
  iconHeight = LOCAL_ICON_SIZE * LOCAL_MAP_SCALE,
}: LocationHoverPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const updatePosition = useCallback(() => {
    if (!popupRef.current || !containerRef?.current || !localMapRef?.current) {
      return;
    }
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerLeft = MODAL_CONTAINER_PADDING;
    const containerTop = MODAL_CONTAINER_PADDING;
    const containerRight = containerRect.width - MODAL_CONTAINER_PADDING;
    const containerBottom = containerRect.height - MODAL_CONTAINER_PADDING;
    const localMapRect = localMapRef.current.getBoundingClientRect();
    const localMapOffsetX = localMapRect.left - containerRect.left;
    const localMapOffsetY = localMapRect.top - containerRect.top;
    const localMapCenterX = localMapRect.width / 2;
    const localMapCenterY = localMapRect.height / 2;
    const closestCorner = getClosestCornerToCenter(
      x,
      y,
      iconWidth,
      iconHeight,
      localMapCenterX,
      localMapCenterY,
    );
    const { anchorX, anchorY, popupCorner } = getPopupAnchorPosition(
      closestCorner,
      x,
      y,
      iconWidth,
      iconHeight,
    );
    const popupRect = popupRef.current.getBoundingClientRect();
    const popupWidth = Math.min(
      LOCATION_HOVER_POPUP_MAX_WIDTH,
      Math.max(LOCATION_HOVER_POPUP_MIN_WIDTH, popupRect.width || 250),
    );
    const popupHeight = popupRect.height || 100;
    let popupLeft = anchorX;
    let popupTop = anchorY;
    let transformX = "0%";
    let transformY = "0%";
    switch (popupCorner) {
      case CORNER.TOP_LEFT:
        transformX = "0%";
        transformY = "0%";
        break;
      case CORNER.TOP_RIGHT:
        transformX = "-100%";
        transformY = "0%";
        break;
      case CORNER.BOTTOM_LEFT:
        transformX = "0%";
        transformY = "-100%";
        break;
      case CORNER.BOTTOM_RIGHT:
        transformX = "-100%";
        transformY = "-100%";
        break;
    }
    popupLeft += localMapOffsetX;
    popupTop += localMapOffsetY;
    if (popupCorner === CORNER.TOP_RIGHT || popupCorner === CORNER.BOTTOM_RIGHT) {
      if (popupLeft - popupWidth < containerLeft) {
        popupLeft = containerLeft + popupWidth;
        transformX = "0%";
      } else if (popupLeft > containerRight) {
        popupLeft = containerRight;
        transformX = "-100%";
      }
    } else {
      if (popupLeft < containerLeft) {
        popupLeft = containerLeft;
        transformX = "0%";
      } else if (popupLeft + popupWidth > containerRight) {
        popupLeft = containerRight - popupWidth;
        transformX = "-100%";
      }
    }
    if (popupCorner === CORNER.BOTTOM_LEFT || popupCorner === CORNER.BOTTOM_RIGHT) {
      if (popupTop - popupHeight < containerTop) {
        popupTop = containerTop + popupHeight;
        transformY = "-100%";
      } else if (popupTop > containerBottom) {
        popupTop = containerBottom;
        transformY = "-100%";
      }
    } else {
      if (popupTop < containerTop) {
        popupTop = containerTop;
        transformY = "0%";
      } else if (popupTop + popupHeight > containerBottom) {
        popupTop = containerBottom - popupHeight;
        transformY = "-100%";
      }
    }
    if (popupRef.current) {
      popupRef.current.style.left = `${popupLeft - localMapOffsetX}px`;
      popupRef.current.style.top = `${popupTop - localMapOffsetY}px`;
      popupRef.current.style.transform = `translate(${transformX}, ${transformY})`;
      popupRef.current.style.marginTop = "0px";
      popupRef.current.style.minWidth = `${LOCATION_HOVER_POPUP_MIN_WIDTH}px`;
      popupRef.current.style.maxWidth = `${LOCATION_HOVER_POPUP_MAX_WIDTH}px`;
    }
  }, [x, y, containerRef, localMapRef, iconWidth, iconHeight]);
  const popupRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      popupRef.current = node;
      if (node) {
        requestAnimationFrame(() => {
          updatePosition();
        });
      }
    },
    [updatePosition],
  );
  return (
    <div
      ref={popupRefCallback}
      className="absolute bg-white border-2 border-slate-400 p-3 shadow-lg z-50 pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: "translate(0%, 0%)",
        marginTop: 0,
        minWidth: LOCATION_HOVER_POPUP_MIN_WIDTH,
        maxWidth: LOCATION_HOVER_POPUP_MAX_WIDTH,
      }}
    >
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-xs text-slate-600">{description}</p>
    </div>
  );
}
