import React from 'react';
import { Link } from 'react-router-dom';

export default function GameEnd({ gameStatus, timelineLength, initGame, difficulte, type, currentStyle }: any) {
  return (
    <section className={`flex flex-col items-center justify-center ${currentStyle.back} min-h-screen w-full px-4`}>
      <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-4 text-center">
        {gameStatus === 'won' ? '🎉 VICTOIRE !' : '💀 DÉFAITE'}
      </h1>
      <p className="text-xl md:text-2xl text-slate-700 mb-12 text-center max-w-lg">
        {gameStatus === 'won' ? `Félicitations, tu as placé ${timelineLength} cartes correctement !` : "Tu n'as plus de vies. La ligne du temps est brisée..."}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={() => initGame(difficulte, type, currentStyle.chances)} className={`px-8 py-4 rounded-xl text-lg md:text-xl font-bold shadow-lg transition-transform hover:scale-105 ${currentStyle.badge}`}>
          Rejouer
        </button>
        <Link to="/" className="px-8 py-4 rounded-xl text-lg md:text-xl font-bold bg-slate-800 text-white shadow-lg transition-transform hover:scale-105 hover:bg-slate-700 text-center">
          Menu Principal
        </Link>
      </div>
    </section>
  );
}