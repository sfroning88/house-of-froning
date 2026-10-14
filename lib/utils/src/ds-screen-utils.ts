const HTTPS_URL_IN_TEXT_RE = /https:\/\/[^\s]+/g;

function trustedHttpsClean(raw: string): string | null {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}

function linkifyHttpsInItem(item: string): string {
  return item.replace(HTTPS_URL_IN_TEXT_RE, (match) => {
    const href = trustedHttpsClean(match);
    if (!href) {
      return match;
    }
    const label = href.replace(/^https:\/\//, "");
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline hover:text-blue-900">${label}</a>`;
  });
}

export function FormatBulletPoints(
  items: string[],
  includesLinks: boolean,
): string {
  return items
    .map((item) => {
      if (includesLinks) {
        item = linkifyHttpsInItem(item);
      }
      return `• ${item}`;
    })
    .join("\n");
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
