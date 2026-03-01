import { DS_TO_WEB_SCALE } from "@lib/constants";
import { TOWN_ID, TownConfig } from "@lib/types";

export function getTownCenter(townId: TOWN_ID): { x: number; y: number } {
  const t = TownConfig[townId];
  return {
    x: (t.x + t.width / 2) * DS_TO_WEB_SCALE,
    y: (t.y + t.height / 2) * DS_TO_WEB_SCALE,
  };
}
