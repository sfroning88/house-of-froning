type MusicState = {
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

type MusicAction =
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
