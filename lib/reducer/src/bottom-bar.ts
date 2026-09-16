import type { BottomBarPanel } from "@lib/types";

type BottomBarState = Record<BottomBarPanel, boolean>;

export const initialBottomBarState: BottomBarState = {
  trainerCard: false,
  spotifySong: false,
  googleBooks: false,
  pokemonBall: false,
  resume: false,
};

type BottomBarAction =
  | { type: "toggle"; panel: BottomBarPanel }
  | { type: "set"; panel: BottomBarPanel; isOpen: boolean };

export function bottomBarReducer(
  state: BottomBarState,
  action: BottomBarAction,
): BottomBarState {
  switch (action.type) {
    case "toggle": {
      const next = !state[action.panel];
      if (state[action.panel] === next) return state;
      return { ...state, [action.panel]: next };
    }
    case "set": {
      if (state[action.panel] === action.isOpen) return state;
      return { ...state, [action.panel]: action.isOpen };
    }
    default:
      return state;
  }
}
