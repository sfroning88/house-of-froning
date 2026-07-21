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
  focusHealthcarePartnersDescription,
  duncanHallDescription,
  ndListensDescription,
  goldenDomeDescription,
  grottoDescription,
  ndCareersCourseDescription,
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
  FOCUS_HEALTHCARE_PARTNERS = "focus healthcare partners",
  DUNCAN_HALL = "duncan hall",
  ND_LISTENS = "nd listens",
  GOLDEN_DOME = "golden dome",
  GROTTO = "grotto",
  ND_CAREERS_COURSE = "nd careers course",
}

export type TownLocationConfig = {
  id: HOVER_LOCATION;
  x: number;
  y: number;
  imagePath: string;
  alt: string;
};

export type TownContentConfig = {
  title: string;
  imagePath: string;
  mapImagePath: string;
  description: string;
  bullets: string;
  locations: TownLocationConfig[];
};

export const HoverConfig: Record<HOVER_LOCATION, string> = {
  [HOVER_LOCATION.SEANS_HOUSE]: seansHouseDescription,
  [HOVER_LOCATION.SAINT_ALPHONSUS_ACADEMY]: saintAlphonsusAcademyDescription,
  [HOVER_LOCATION.CHICAGO_WARRIORS_BASEBALL_CLUB]:
    chicagoWarriorsBaseballClubDescription,
  [HOVER_LOCATION.ROWAN_LABS]: rowanLabsDescription,
  [HOVER_LOCATION.FOCUS_HEALTHCARE_PARTNERS]:
    focusHealthcarePartnersDescription,
  [HOVER_LOCATION.DUNCAN_HALL]: duncanHallDescription,
  [HOVER_LOCATION.ND_LISTENS]: ndListensDescription,
  [HOVER_LOCATION.GOLDEN_DOME]: goldenDomeDescription,
  [HOVER_LOCATION.GROTTO]: grottoDescription,
  [HOVER_LOCATION.ND_CAREERS_COURSE]: ndCareersCourseDescription,
};

export type SpotifyTrackItem = {
  name: string;
  artists: Array<{
    name: string;
  }>;
  album: {
    name: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
    }>;
  };
  external_urls: {
    spotify: string;
  };
  preview_url: string | null;
};

export type SpotifySongData = {
  name: string;
  artists: [
    {
      name: string;
    },
  ];
  album: {
    name: string;
    images: [
      {
        url: string;
        width: string;
        height: string;
      },
    ];
  };
  externalUrls: {
    spotify: string;
  };
  previewUrl: string | null;
};

export enum GoogleSheetBookStatus {
  NEED_TO_BUY = "need to buy",
  ORDERED = "ordered",
  INACTIVE = "inactive",
  READING = "reading",
  FINISHED = "finished",
}

export type GoogleSheetBookData = {
  title: string;
  series: string;
  order: number;
  author: string;
  status: GoogleSheetBookStatus;
  dateBegan: string;
  dateFinished: string;
  daysToRead: number;
  topics: string;
  thoughts: string;
  coverImageUrl: string | null;
};
