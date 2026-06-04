export type BottomBarPanel =
  | "trainerCard"
  | "spotifySong"
  | "googleBooks"
  | "pokemonBall"
  | "resume";

export type BottomBarState = Record<BottomBarPanel, boolean>;

export const initialBottomBarState: BottomBarState = {
  trainerCard: false,
  spotifySong: false,
  googleBooks: false,
  pokemonBall: false,
  resume: false,
};

export type BottomBarAction =
  | { type: "toggle"; panel: BottomBarPanel }
  | { type: "set"; panel: BottomBarPanel; isOpen: boolean };

export function bottomBarReducer(
  state: BottomBarState,
  action: BottomBarAction,
): BottomBarState {
  switch (action.type) {
    case "toggle":
      return { ...state, [action.panel]: !state[action.panel] };
    case "set":
      return { ...state, [action.panel]: action.isOpen };
    default:
      return state;
  }
}

export type MusicState = {
  mounted: boolean;
  trackIndex: number;
  effectiveTrackIndex: number;
  isMuted: boolean;
};

export const initialMusicState: MusicState = {
  mounted: false,
  trackIndex: 0,
  effectiveTrackIndex: 0,
  isMuted: true,
};

export type MusicAction =
  | { type: "hydrate"; trackIndex: number }
  | { type: "advanceTrack"; trackCount: number }
  | { type: "mute" }
  | { type: "unmute" };

export function musicReducer(
  state: MusicState,
  action: MusicAction,
): MusicState {
  switch (action.type) {
    case "hydrate":
      return {
        ...state,
        mounted: true,
        trackIndex: action.trackIndex,
        effectiveTrackIndex: action.trackIndex,
      };
    case "advanceTrack":
      return {
        ...state,
        effectiveTrackIndex:
          (state.effectiveTrackIndex + 1) % action.trackCount,
      };
    case "mute":
      return { ...state, isMuted: true };
    case "unmute":
      return { ...state, isMuted: false };
    default:
      return state;
  }
}
