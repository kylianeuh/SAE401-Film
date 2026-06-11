import React from 'react';
import { Link } from 'react-router-dom';

export default function GameHeader({ difficulte, typeLabel, currentStyle, globalChancesLeft, deckLength, hintsCount }: any) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center w-full max-w-7xl pt-4 gap-4">
      <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto justify-center sm:justify-start">
        <Link to="/" className={`uppercase px-4 py-2 ${currentStyle.badge} text-sm md:text-xl font-bold w-32 text-center rounded-lg shadow-sm`}>{difficulte}</Link>
        <div className={`uppercase px-4 py-2 ${currentStyle.badge} text-sm md:text-xl font-bold w-32 text-center rounded-lg shadow-sm`}>{typeLabel}</div>
      </div>
      
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          {globalChancesLeft === Infinity ? <span className="text-2xl font-bold text-slate-700">Vies : ∞</span> : 
            <div className="flex gap-1">{[...Array(currentStyle.chances)].map((_, i) => <span key={i} className={`text-2xl ${i < globalChancesLeft ? 'text-red-500' : 'opacity-50 grayscale'}`}>❤️</span>)}</div>
          }
        </div>
        <div className="text-sm font-bold text-slate-700 bg-white/50 px-3 py-1 rounded-full">
          💡 Indices : {hintsCount} | 🎴 Cartes : {deckLength}
        </div>
      </div>

      <h1 className="uppercase text-3xl md:text-5xl font-black tracking-wider text-slate-800 text-center sm:text-right p-2">Flash-Back</h1>
    </header>
  );
}