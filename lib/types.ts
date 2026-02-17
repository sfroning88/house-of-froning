import {
    CHICAGO_X,
    CHICAGO_Y,
    CHICAGO_WIDTH,
    CHICAGO_HEIGHT,
} from "@lib/constants";

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
