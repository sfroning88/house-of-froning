import {
  CHICAGO_X,
  CHICAGO_Y,
  CHICAGO_WIDTH,
  CHICAGO_HEIGHT,
  NOTRE_DAME_X,
  NOTRE_DAME_Y,
  NOTRE_DAME_WIDTH,
  NOTRE_DAME_HEIGHT,
} from "@lib/constants";
import {
  seansHouseDescription,
  saintAlphonsusAcademyDescription,
  chicagoWarriorsBaseballClubDescription,
  rowanLabsDescription,
  duncanHallDescription,
  ndListensDescription,
  goldenDomeDescription,
  grottoDescription,
} from "@/lib/text";

export type AvatarPosition = {
  x: number;
  y: number;
};

export enum TOWN_ID {
  CHICAGO = "chicago",
  NOTRE_DAME = "notre dame",
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
  [TOWN_ID.NOTRE_DAME]: {
    x: NOTRE_DAME_X,
    y: NOTRE_DAME_Y,
    width: NOTRE_DAME_WIDTH,
    height: NOTRE_DAME_HEIGHT,
  },
};

export enum HOVER_LOCATION {
  SEANS_HOUSE = "sean's house",
  SAINT_ALPHONSUS_ACADEMY = "saint alphonsus academy",
  CHICAGO_WARRIORS_BASEBALL_CLUB = "chicago warriors baseball club",
  ROWAN_LABS = "rowan labs",
  DUNCAN_HALL = "duncan hall",
  ND_LISTENS = "nd listens",
  GOLDEN_DOME = "golden dome",
  GROTTO = "grotto",
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
  [HOVER_LOCATION.DUNCAN_HALL]: duncanHallDescription,
  [HOVER_LOCATION.ND_LISTENS]: ndListensDescription,
  [HOVER_LOCATION.GOLDEN_DOME]: goldenDomeDescription,
  [HOVER_LOCATION.GROTTO]: grottoDescription,
};
