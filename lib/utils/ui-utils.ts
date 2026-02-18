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
  innerHeightRatio: number
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
