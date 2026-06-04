"use client";

import { useReducer } from "react";
import {
  IdCard,
  RadioTower,
  BookOpenText,
  Newspaper,
  Volume2,
  VolumeX,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { MdCatchingPokemon } from "react-icons/md";
import posthog from "posthog-js";
import {
  BOTTOM_BAR_BUTTON_SIZE,
  GITHUB_REDIRECT_LINK,
  LINKEDIN_REDIRECT_LINK,
} from "@/lib/constants";
import { POSTHOG_EVENTS } from "@/lib/events";
import {
  bottomBarReducer,
  initialBottomBarState,
  type BottomBarPanel,
} from "@lib/utils";
import { useMusicContext } from "@/app/providers";
import { TrainerCard } from "./(bottom)/TrainerCard";
import { SpotifySong } from "./(bottom)/SpotifySong";
import { GoogleBooks } from "./(bottom)/GoogleBooks";
import { PokemonBall } from "./(bottom)/PokemonBall";
import { ResumeContent } from "./(bottom)/ResumeContent";
import { TEST_IDS } from "@/lib/test-ids";

const PANEL_POSTHOG_EVENTS: Record<
  BottomBarPanel,
  { opened: string; closed: string }
> = {
  trainerCard: {
    opened: POSTHOG_EVENTS.trainer_card_opened,
    closed: POSTHOG_EVENTS.trainer_card_closed,
  },
  spotifySong: {
    opened: POSTHOG_EVENTS.spotify_song_opened,
    closed: POSTHOG_EVENTS.spotify_song_closed,
  },
  googleBooks: {
    opened: POSTHOG_EVENTS.google_books_opened,
    closed: POSTHOG_EVENTS.google_books_closed,
  },
  pokemonBall: {
    opened: POSTHOG_EVENTS.pokemon_ball_opened,
    closed: POSTHOG_EVENTS.pokemon_ball_closed,
  },
  resume: {
    opened: POSTHOG_EVENTS.resume_opened,
    closed: POSTHOG_EVENTS.resume_closed,
  },
};

type BottomBarProps = {
  onModalStateChange?: (isOpen: boolean) => void;
  dsInnerScreenSize: { width: number; height: number };
  dsInnerScreenCenter: { x: number; y: number };
  bottomBarLayout: { left: number; top: number; width: number };
};

export function BottomBar({
  onModalStateChange,
  dsInnerScreenSize,
  dsInnerScreenCenter,
  bottomBarLayout,
}: BottomBarProps) {
  const [panelState, dispatch] = useReducer(
    bottomBarReducer,
    initialBottomBarState,
  );
  const handlePanelToggle = (panel: BottomBarPanel) => {
    const next = !panelState[panel];
    dispatch({ type: "toggle", panel });
    posthog.capture(
      next
        ? PANEL_POSTHOG_EVENTS[panel].opened
        : PANEL_POSTHOG_EVENTS[panel].closed,
    );
  };
  const handlePanelStateChange = (panel: BottomBarPanel, isOpen: boolean) => {
    dispatch({ type: "set", panel, isOpen });
    onModalStateChange?.(isOpen);
  };
  const musicContext = useMusicContext();
  if (bottomBarLayout.width === 0) {
    return null;
  }
  return (
    <>
      <div
        data-testid={TEST_IDS.bottomBar}
        className="absolute bg-slate-700 border-t-2 border-slate-500 flex items-center justify-around z-30"
        style={{
          left: `${bottomBarLayout.left}px`,
          top: `${bottomBarLayout.top}px`,
          width: `${bottomBarLayout.width}px`,
          paddingTop: BOTTOM_BAR_BUTTON_SIZE / 4,
          paddingBottom: BOTTOM_BAR_BUTTON_SIZE / 4,
        }}
      >
        <button
          onClick={() => handlePanelToggle("trainerCard")}
          className="flex items-center justify-center bg-slate-600 hover:bg-slate-500 rounded border border-slate-400 transition-colors"
          style={{
            width: BOTTOM_BAR_BUTTON_SIZE,
            height: BOTTOM_BAR_BUTTON_SIZE,
          }}
          aria-label="Trainer Card"
        >
          <IdCard
            className="text-white"
            style={{
              width: BOTTOM_BAR_BUTTON_SIZE / 2,
              height: BOTTOM_BAR_BUTTON_SIZE / 2,
            }}
          />
        </button>
        <button
          onClick={() => handlePanelToggle("spotifySong")}
          className="flex items-center justify-center bg-slate-600 hover:bg-slate-500 rounded border border-slate-400 transition-colors"
          style={{
            width: BOTTOM_BAR_BUTTON_SIZE,
            height: BOTTOM_BAR_BUTTON_SIZE,
          }}
          aria-label="Spotify Song"
        >
          <RadioTower
            className="text-white"
            style={{
              width: BOTTOM_BAR_BUTTON_SIZE / 2,
              height: BOTTOM_BAR_BUTTON_SIZE / 2,
            }}
          />
        </button>
        <button
          onClick={() => handlePanelToggle("googleBooks")}
          className="flex items-center justify-center bg-slate-600 hover:bg-slate-500 rounded border border-slate-400 transition-colors"
          style={{
            width: BOTTOM_BAR_BUTTON_SIZE,
            height: BOTTOM_BAR_BUTTON_SIZE,
          }}
          aria-label="Google Books"
        >
          <BookOpenText
            className="text-white"
            style={{
              width: BOTTOM_BAR_BUTTON_SIZE / 2,
              height: BOTTOM_BAR_BUTTON_SIZE / 2,
            }}
          />
        </button>
        <button
          onClick={() => handlePanelToggle("pokemonBall")}
          className="flex items-center justify-center bg-slate-600 hover:bg-slate-500 rounded border border-slate-400 transition-colors"
          style={{
            width: BOTTOM_BAR_BUTTON_SIZE,
            height: BOTTOM_BAR_BUTTON_SIZE,
          }}
          aria-label="Placeholder"
        >
          <MdCatchingPokemon
            className="text-white"
            style={{
              width: BOTTOM_BAR_BUTTON_SIZE / 2,
              height: BOTTOM_BAR_BUTTON_SIZE / 2,
            }}
          />
        </button>
        <button
          onClick={() => handlePanelToggle("resume")}
          className="flex items-center justify-center bg-slate-600 hover:bg-slate-500 rounded border border-slate-400 transition-colors"
          style={{
            width: BOTTOM_BAR_BUTTON_SIZE,
            height: BOTTOM_BAR_BUTTON_SIZE,
          }}
          aria-label="Placeholder"
        >
          <Newspaper
            className="text-white"
            style={{
              width: BOTTOM_BAR_BUTTON_SIZE / 2,
              height: BOTTOM_BAR_BUTTON_SIZE / 2,
            }}
          />
        </button>
        <a
          href={GITHUB_REDIRECT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => posthog.capture(POSTHOG_EVENTS.github_link_clicked)}
          className="flex items-center justify-center bg-slate-600 hover:bg-slate-500 rounded border border-slate-400 transition-colors"
          style={{
            width: BOTTOM_BAR_BUTTON_SIZE,
            height: BOTTOM_BAR_BUTTON_SIZE,
          }}
          aria-label="GitHub"
        >
          <SiGithub
            className="text-white"
            style={{
              width: BOTTOM_BAR_BUTTON_SIZE / 2,
              height: BOTTOM_BAR_BUTTON_SIZE / 2,
            }}
          />
        </a>
        <a
          href={LINKEDIN_REDIRECT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => posthog.capture(POSTHOG_EVENTS.linkedin_link_clicked)}
          className="flex items-center justify-center bg-slate-600 hover:bg-slate-500 rounded border border-slate-400 transition-colors"
          style={{
            width: BOTTOM_BAR_BUTTON_SIZE,
            height: BOTTOM_BAR_BUTTON_SIZE,
          }}
          aria-label="LinkedIn"
        >
          <FaLinkedin
            className="text-white"
            style={{
              width: BOTTOM_BAR_BUTTON_SIZE / 2,
              height: BOTTOM_BAR_BUTTON_SIZE / 2,
            }}
          />
        </a>
        {musicContext && (
          <button
            onClick={() => {
              if (musicContext.isMuted) {
                musicContext.unmute();
                posthog.capture(POSTHOG_EVENTS.music_unmuted);
              } else {
                musicContext.mute();
              }
            }}
            className="flex items-center justify-center bg-slate-600 hover:bg-slate-500 rounded border border-slate-400 transition-colors"
            style={{
              width: BOTTOM_BAR_BUTTON_SIZE,
              height: BOTTOM_BAR_BUTTON_SIZE,
            }}
            aria-label={musicContext.isMuted ? "Unmute music" : "Mute music"}
          >
            {musicContext.isMuted ? (
              <Volume2
                className="text-white"
                style={{
                  width: BOTTOM_BAR_BUTTON_SIZE / 2,
                  height: BOTTOM_BAR_BUTTON_SIZE / 2,
                }}
              />
            ) : (
              <VolumeX
                className="text-white"
                style={{
                  width: BOTTOM_BAR_BUTTON_SIZE / 2,
                  height: BOTTOM_BAR_BUTTON_SIZE / 2,
                }}
              />
            )}
          </button>
        )}
      </div>
      {panelState.trainerCard && (
        <TrainerCard
          onModalStateChange={(isOpen) =>
            handlePanelStateChange("trainerCard", isOpen)
          }
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          onClose={() => handlePanelStateChange("trainerCard", false)}
        />
      )}
      {panelState.spotifySong && (
        <SpotifySong
          onModalStateChange={(isOpen) =>
            handlePanelStateChange("spotifySong", isOpen)
          }
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          onClose={() => handlePanelStateChange("spotifySong", false)}
        />
      )}
      {panelState.googleBooks && (
        <GoogleBooks
          onModalStateChange={(isOpen) =>
            handlePanelStateChange("googleBooks", isOpen)
          }
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          onClose={() => handlePanelStateChange("googleBooks", false)}
        />
      )}
      {panelState.pokemonBall && (
        <PokemonBall
          onModalStateChange={(isOpen) =>
            handlePanelStateChange("pokemonBall", isOpen)
          }
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          onClose={() => handlePanelStateChange("pokemonBall", false)}
        />
      )}
      {panelState.resume && (
        <ResumeContent
          onModalStateChange={(isOpen) =>
            handlePanelStateChange("resume", isOpen)
          }
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          onClose={() => handlePanelStateChange("resume", false)}
        />
      )}
    </>
  );
}
