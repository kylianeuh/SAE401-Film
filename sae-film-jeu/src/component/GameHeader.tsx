import React from 'react';
import { Link } from 'react-router-dom';

export default function GameHeader({ difficulte, typeLabel }: any) {
  const modeTitles: Record<string, string> = {
    facile: "REPETITION GENERALE",
    normale: "PRISE N°1",
    default: "PLAN-SEQUENCE"
  };

  const currentModeTitle = modeTitles[difficulte] || modeTitles.default;

  return (
    <header className="w-full max-w-7xl flex items-center justify-between mt-4 mb-2 relative z-10 text-fb-dark font-rokkitt gap-2 md:gap-4">
      
      <Link 
        to="/game-type" 
        state={{ difficulte }}
        className="w-10 h-10 text-fb-dark hover:scale-105 transition-transform flex items-center justify-center shrink-0 cursor-pointer"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </Link>

      <div className="flex-1 text-left pl-2 md:pl-4 pr-4">
        <h2 className="font-limelight uppercase text-fb-red text-lg sm:text-2xl md:text-4xl tracking-wider leading-none truncate">
          {currentModeTitle}
        </h2>
        <p className="text-xs sm:text-sm md:text-lg font-bold uppercase tracking-widest mt-0.5 md:mt-1 text-fb-dark opacity-90 truncate">
          {typeLabel}
        </p>
      </div>

      <h1 className="font-limelight uppercase text-fb-red text-2xl sm:text-3xl md:text-5xl tracking-wide select-none shrink-0 text-right">
        Flash-Back
      </h1>

    </header>
  );
}