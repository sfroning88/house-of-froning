import {
  CHICAGO_X,
  CHICAGO_Y,
  CHICAGO_WIDTH,
  CHICAGO_HEIGHT,
} from "@lib/constants";
import {
  seansHouseDescription,
  saintAlphonsusAcademyDescription,
  chicagoWarriorsBaseballClubDescription,
  rowanLabsDescription,
} from "@/lib/text";

export type AvatarPosition = {
  x: number;
  y: number;
};

export enum TOWN_ID {
  CHICAGO = "chicago",
}

export type TownConfigEntry = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const TownConfig: Record<TOWN_ID, TownConfigEntry> = {
  [TOWN_ID.CHICAGO]: {
    x: CHICAGO_X,
    y: CHICAGO_Y,
    width: CHICAGO_WIDTH,
    height: CHICAGO_HEIGHT,
  },
};

export enum HOVER_LOCATION {
  SEANS_HOUSE = "sean's house",
  SAINT_ALPHONSUS_ACADEMY = "saint alphonsus academy",
  CHICAGO_WARRIORS_BASEBALL_CLUB = "chicago warriors baseball club",
  ROWAN_LABS = "rowan labs",
}

export type HoverLocation = {
  location: HOVER_LOCATION;
  hover: boolean;
};

export const HoverConfig: Record<HOVER_LOCATION, string> = {
  [HOVER_LOCATION.SEANS_HOUSE]: seansHouseDescription,
  [HOVER_LOCATION.SAINT_ALPHONSUS_ACADEMY]: saintAlphonsusAcademyDescription,
  [HOVER_LOCATION.CHICAGO_WARRIORS_BASEBALL_CLUB]:
    chicagoWarriorsBaseballClubDescription,
  [HOVER_LOCATION.ROWAN_LABS]: rowanLabsDescription,
};
