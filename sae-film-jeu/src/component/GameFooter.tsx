import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import Cards from './Cards';

export default function GameFooter({ activeCard, type, isSelected, setIsSelected, currentStyle, generateHint, hintsCount, currentHint }: any) {
  
  // Configuration de la carte prenable (Draggable)
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: 'active-card' });

  if (!activeCard) return null;

  return (
    <footer className="w-full max-w-7xl flex flex-col justify-start min-h-[200px]">
      <div className="flex items-center w-full gap-2">
        
        {/* Colonne Gauche : Infos */}
        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex flex-col gap-2 text-sm md:text-base w-full max-w-[250px]">
            <span className="font-bold underline mb-2 block">Infos de la carte :</span>
            <p className="border rounded-xl p-2 bg-white/30">Durée : {type === "duree" ? "???" : `${activeCard.duree_en_minutes} min`}</p>
            <p className="border rounded-xl p-2 bg-white/30 truncate">Box Office : {type === "recette" ? "???" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(activeCard.box_office)}</p>
            <p className="border rounded-xl p-2 bg-white/30">Date : {type === "date" || type === "annee" ? "???" : activeCard.date_de_sortie}</p>
            <p className="border rounded-xl p-2 bg-white/30">Note : {type === "notes" ? "???/10" : activeCard.note_globale}</p>
            {hintsCount > 0 && !currentHint && (
              <button onClick={() => generateHint(type)} className="mt-2 bg-yellow-400 text-yellow-900 font-bold py-2 rounded-xl hover:bg-yellow-300">💡 Utiliser 1 Indice</button>
            )}
            {currentHint && <p className="mt-2 bg-green-200 text-green-900 font-bold py-2 px-3 rounded-xl">Indice : {currentHint}</p>}
          </div>
          <div className={`h-full w-1 hidden md:block ${currentStyle.line} rounded-full ml-4`}></div>
        </div>

        {/* Centre : Carte Draggable */}
        <div className="h-44 md:h-64 flex flex-col items-center justify-center relative w-full max-w-sm shrink-0">
          <p className="text-slate-600 text-xs mb-2 md:hidden">Glisse ou touche la carte</p>
          
          <div 
            ref={setNodeRef} 
            {...listeners} 
            {...attributes}
            // Opacité réduite à l'endroit d'origine quand la carte est soulevée
            className={`cursor-grab active:cursor-grabbing touch-none ${isDragging ? 'opacity-30' : 'opacity-100'}`}
          >
            <Cards film={activeCard} isSelected={isSelected} onClick={() => setIsSelected(!isSelected)} />
          </div>
        </div>

        {/* Colonne Droite : Synopsis */}
        <div className="flex-1 flex justify-center h-full">
          <div className="hidden md:flex gap-2 w-full max-w-[300px]">
            <div className={`h-full w-1 hidden md:block ${currentStyle.line} rounded-full mx-2`}></div>
            <div className="text-sm md:text-base w-full">
              <span className="font-bold underline mb-2 block">Synopsis :</span>
              <p className="line-clamp-6 bg-white/30 p-3 rounded-xl">{activeCard.synopsis}</p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}