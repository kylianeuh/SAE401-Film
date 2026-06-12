import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import Cards from './Cards';

export default function GameFooter({ activeCard, type, isSelected, setIsSelected, generateHint, hintsCount, currentHint, deckLength }: any) {

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: 'active-card' });

  if (!activeCard) return null;

  return (
    <footer className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-4 pb-8 font-rokkitt relative z-10 text-fb-dark">

      {/* 1. BLOC FICHE TECHNIQUE */}
      <div className="md:col-span-4 border-[4px] border-fb-dark bg-[#F2EAD3]/40 flex flex-col rounded-sm min-h-[280px]">
        {/* Titre style maquette */}
        <div className="bg-fb-dark text-fb-cream text-center py-2">
          <h3 className="font-limelight text-lg uppercase tracking-wider">
            Fiche technique
          </h3>
        </div>

        {/* Contenu de la fiche technique */}
        <div className="p-4 flex-1 flex flex-col justify-between font-bold text-sm md:text-base">
          <div className="space-y-2">
            <div>
              <span className="font-limelight text-xs uppercase tracking-wider text-fb-dark block opacity-80">Année de production</span>
              <span className="text-fb-dark text-base">{type === "annee" ? "2026" : activeCard.annee_de_sortie}</span>
            </div>
            <div>
              <span className="font-limelight text-xs uppercase tracking-wider text-fb-dark block opacity-80">La Première</span>
              <span className="text-fb-dark text-base">{type === "date" || type === "annee" ? "08/06/20206" : activeCard.date_de_sortie}</span>
            </div>
            <div>
              <span className="font-limelight text-xs uppercase tracking-wider text-fb-dark block opacity-80">Appréciation critique</span>
              <span className="text-fb-dark text-base">{type === "notes" ? "8.594" : `${activeCard.note_globale}`}</span>
            </div>
            <div>
              <span className="font-limelight text-xs uppercase tracking-wider text-fb-dark block opacity-80">Métrage</span>
              <span className="text-fb-dark text-base">{type === "duree" ? "167 minutes" : `${activeCard.duree_en_minutes} minutes`}</span>
            </div>
            <div>
              <span className="font-limelight text-xs uppercase tracking-wider text-fb-dark block opacity-80">Recettes commerciales</span>
              <span className="text-fb-dark text-base">
                {type === "recette" ? "1.026.548 €" : new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(activeCard.box_office)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CENTRE : TICKET DE LA CARTE ACTIVE */}
      {/* On encapsule la carte dans la bordure noire perforée "style ticket" de la maquette */}
      <div className="md:col-span-3 flex justify-center items-center pt-2">
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          onClick={() => setIsSelected(!isSelected)}
          className={`cursor-grab active:cursor-grabbing touch-none transition-all duration-200 transform ${isDragging ? 'opacity-30' : 'opacity-100'}`}
        >
          <Cards film={activeCard} isSelected={isSelected} />
        </div>
      </div>

      {/* 3. BLOC SYNOPSIS */}
      <div className="md:col-span-3 border-[4px] h-80 border-fb-dark bg-[#F2EAD3]/40 flex flex-col rounded-sm min-h-[280px]">
        {/* Titre style maquette */}
        <div className="bg-fb-dark text-fb-cream text-center py-2">
          <h3 className="font-limelight text-lg uppercase tracking-wider">
            Synopsis
          </h3>
        </div>

        {/* Corps du texte text-justify comme demandé par le modèle */}
        <div className="p-4 text-sm md:text-base font-medium tracking-wide leading-relaxed text-justify flex-1 overflow-y-auto">
          <p className="text-fb-dark">
            {currentHint ? `💡 INDICE : ${currentHint}` : activeCard.synopsis}
          </p>
        </div>
      </div>

      {/* 4. BLOC DE DROITE : COMPTEURS FLOTTANTS (SANS CADRE GLOBAL) */}
      <div className="md:col-span-2 flex flex-col justify-start items-center gap-8 pt-6 select-none h-full">

        {/* Zone des indices cliquable sur l'icône */}
        <div className="text-center flex flex-col items-center group">
          <button
            onClick={() => hintsCount > 0 && !currentHint && generateHint(type)}
            disabled={hintsCount === 0 || !!currentHint}
            className={`w-14 h-10 bg-fb-dark text-fb-cream flex items-center justify-center border-x-4 border-dashed border-fb-cream/20 rounded-sm shadow-sm mb-2 transition-transform active:scale-95
              ${hintsCount > 0 && !currentHint ? "cursor-pointer hover:bg-fb-red" : "cursor-default opacity-80"}`}
          >
            {/* SVG Étoile Blanche de la maquette */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
          <p className="text-sm md:text-base font-black text-fb-dark tracking-wide leading-tight">
            {hintsCount} indices <br />
            <span className="font-normal lowercase text-xs md:text-sm block mt-0.5">disponibles</span>
          </p>
        </div>

        {/* Zone du paquet / cartes restantes */}
        <div className="text-center flex flex-col items-center">
          <div className="w-14 h-10 bg-fb-dark text-fb-cream flex items-center justify-center border-x-4 border-dashed border-fb-cream/20 rounded-sm shadow-sm mb-2">
            {/* Icône de paquet / cartes empilées */}
            <svg className="w-5 h-5 text-fb-cream" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 4h16v2H2zm2 4h16v2H4zm2 4h16v2H6zm2 4h16v2H8z" />
            </svg>
          </div>
          <p className="text-sm md:text-base font-black text-fb-dark tracking-wide leading-tight">
            {deckLength} cartes <br />
            <span className="font-normal lowercase text-xs md:text-sm block mt-0.5">restantes</span>
          </p>
        </div>

      </div>

    </footer>
  );
}