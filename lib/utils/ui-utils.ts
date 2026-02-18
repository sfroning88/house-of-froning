import { CORNER } from "@/lib/types";

export function FormatBulletPoints(items: string[]): string {
  return items.map((item) => `• ${item}`).join("\n");
}

export function getMapScaleAndPosition(
  imageWidth: number,
  imageHeight: number,
  mapWidth: number,
  mapHeight: number,
  centerXRatio: number,
  centerYRatio: number,
  innerWidthRatio: number,
  innerHeightRatio: number,
): { scaleX: number; scaleY: number; x: number; y: number } {
  const innerWidth = imageWidth * innerWidthRatio;
  const innerHeight = imageHeight * innerHeightRatio;
  const scaleX = innerWidth / mapWidth;
  const scaleY = innerHeight / mapHeight;
  const scaledMapWidth = mapWidth * scaleX;
  const scaledMapHeight = mapHeight * scaleY;
  const centerX = imageWidth * centerXRatio;
  const centerY = imageHeight * centerYRatio;
  const x = centerX - scaledMapWidth / 2;
  const y = centerY - scaledMapHeight / 2;
  return { scaleX, scaleY, x, y };
}

export function getDsInnerScreenCenter(
  imageWidth: number,
  imageHeight: number,
  centerXRatio: number,
  centerYRatio: number,
): { x: number; y: number } {
  return {
    x: imageWidth * centerXRatio,
    y: imageHeight * centerYRatio,
  };
}

export function getClosestCornerToCenter(
  iconX: number,
  iconY: number,
  iconWidth: number,
  iconHeight: number,
  mapCenterX: number,
  mapCenterY: number,
): CORNER {
  const topLeft = {
    x: iconX,
    y: iconY,
    distance: Math.pow(iconX - mapCenterX, 2) + Math.pow(iconY - mapCenterY, 2),
  };
  const topRight = {
    x: iconX + iconWidth,
    y: iconY,
    distance:
      Math.pow(iconX + iconWidth - mapCenterX, 2) +
      Math.pow(iconY - mapCenterY, 2),
  };
  const bottomLeft = {
    x: iconX,
    y: iconY + iconHeight,
    distance:
      Math.pow(iconX - mapCenterX, 2) +
      Math.pow(iconY + iconHeight - mapCenterY, 2),
  };
  const bottomRight = {
    x: iconX + iconWidth,
    y: iconY + iconHeight,
    distance:
      Math.pow(iconX + iconWidth - mapCenterX, 2) +
      Math.pow(iconY + iconHeight - mapCenterY, 2),
  };
  const corners = [topLeft, topRight, bottomLeft, bottomRight];
  const closest = corners.reduce((min, corner) =>
    corner.distance < min.distance ? corner : min,
  );
  if (closest === topLeft) return CORNER.TOP_LEFT;
  if (closest === topRight) return CORNER.TOP_RIGHT;
  if (closest === bottomLeft) return CORNER.BOTTOM_LEFT;
  return CORNER.BOTTOM_RIGHT;
}

export function getPopupAnchorPosition(
  iconCorner: CORNER,
  iconX: number,
  iconY: number,
  iconWidth: number,
  iconHeight: number,
): { anchorX: number; anchorY: number; popupCorner: CORNER } {
  let anchorX: number;
  let anchorY: number;
  let popupCorner: CORNER;
  switch (iconCorner) {
    case CORNER.TOP_LEFT:
      anchorX = iconX;
      anchorY = iconY;
      popupCorner = CORNER.BOTTOM_RIGHT;
      break;
    case CORNER.TOP_RIGHT:
      anchorX = iconX + iconWidth;
      anchorY = iconY;
      popupCorner = CORNER.BOTTOM_LEFT;
      break;
    case CORNER.BOTTOM_LEFT:
      anchorX = iconX;
      anchorY = iconY + iconHeight;
      popupCorner = CORNER.TOP_RIGHT;
      break;
    case CORNER.BOTTOM_RIGHT:
      anchorX = iconX + iconWidth;
      anchorY = iconY + iconHeight;
      popupCorner = CORNER.TOP_LEFT;
      break;
  }
  return { anchorX, anchorY, popupCorner };
}
