"use client";

import { useState } from "react";
import { IdCard, RadioTower, BookOpenText, Newspaper } from "lucide-react";
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
import { TrainerCard } from "./(bottom)/TrainerCard";
import { SpotifySong } from "./(bottom)/SpotifySong";
import { GoogleBooks } from "./(bottom)/GoogleBooks";
import { PokemonBall } from "./(bottom)/PokemonBall";
import { ResumeContent } from "./(bottom)/ResumeContent";

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
  const [isTrainerCardOpen, setIsTrainerCardOpen] = useState(false);
  const handleTrainerCardToggle = () => {
    const next = !isTrainerCardOpen;
    setIsTrainerCardOpen(next);
    posthog.capture(
      next
        ? POSTHOG_EVENTS.trainer_card_opened
        : POSTHOG_EVENTS.trainer_card_closed,
    );
  };
  const handleTrainerCardStateChange = (isOpen: boolean) => {
    setIsTrainerCardOpen(isOpen);
    onModalStateChange?.(isOpen);
  };
  const [isSpotifySongOpen, setIsSpotifySongOpen] = useState(false);
  const handleSpotifySongToggle = () => {
    const next = !isSpotifySongOpen;
    setIsSpotifySongOpen(next);
    posthog.capture(
      next
        ? POSTHOG_EVENTS.spotify_song_opened
        : POSTHOG_EVENTS.spotify_song_closed,
    );
  };
  const handleSpotifySongStateChange = (isOpen: boolean) => {
    setIsSpotifySongOpen(isOpen);
    onModalStateChange?.(isOpen);
  };
  const [isGoogleBooksOpen, setIsGoogleBooksOpen] = useState(false);
  const handleGoogleBooksToggle = () => {
    const next = !isGoogleBooksOpen;
    setIsGoogleBooksOpen(next);
    posthog.capture(
      next
        ? POSTHOG_EVENTS.google_books_opened
        : POSTHOG_EVENTS.google_books_closed,
    );
  };
  const handleGoogleBooksStateChange = (isOpen: boolean) => {
    setIsGoogleBooksOpen(isOpen);
    onModalStateChange?.(isOpen);
  };
  const [isPokemonBallOpen, setIsPokemonBallOpen] = useState(false);
  const handlePokemonBallToggle = () => {
    const next = !isPokemonBallOpen;
    setIsPokemonBallOpen(next);
    posthog.capture(
      next
        ? POSTHOG_EVENTS.pokemon_ball_opened
        : POSTHOG_EVENTS.pokemon_ball_closed,
    );
  };
  const handlePokemonBallStateChange = (isOpen: boolean) => {
    setIsPokemonBallOpen(isOpen);
    onModalStateChange?.(isOpen);
  };
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const handleResumeToggle = () => {
    const next = !isResumeOpen;
    setIsResumeOpen(next);
    posthog.capture(
      next ? POSTHOG_EVENTS.resume_opened : POSTHOG_EVENTS.resume_closed,
    );
  };
  const handleResumeStateChange = (isOpen: boolean) => {
    setIsResumeOpen(isOpen);
    onModalStateChange?.(isOpen);
  };
  if (bottomBarLayout.width === 0) {
    return null;
  }
  return (
    <>
      <div
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
          onClick={handleTrainerCardToggle}
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
          onClick={handleSpotifySongToggle}
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
          onClick={handleGoogleBooksToggle}
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
          onClick={handlePokemonBallToggle}
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
          onClick={handleResumeToggle}
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
      </div>
      {isTrainerCardOpen && (
        <TrainerCard
          onModalStateChange={handleTrainerCardStateChange}
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          onClose={() => handleTrainerCardStateChange(false)}
        />
      )}
      {isSpotifySongOpen && (
        <SpotifySong
          onModalStateChange={handleSpotifySongStateChange}
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          onClose={() => handleSpotifySongStateChange(false)}
        />
      )}
      {isGoogleBooksOpen && (
        <GoogleBooks
          onModalStateChange={handleGoogleBooksStateChange}
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          onClose={() => handleGoogleBooksStateChange(false)}
        />
      )}
      {isPokemonBallOpen && (
        <PokemonBall
          onModalStateChange={handlePokemonBallStateChange}
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          onClose={() => handlePokemonBallStateChange(false)}
        />
      )}
      {isResumeOpen && (
        <ResumeContent
          onModalStateChange={handleResumeStateChange}
          dsInnerScreenSize={dsInnerScreenSize}
          dsInnerScreenCenter={dsInnerScreenCenter}
          onClose={() => handleResumeStateChange(false)}
        />
      )}
    </>
  );
}
