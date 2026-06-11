import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css";
import Cards from "./component/Cards";
import { useGameStore } from "../store/useGameStore";
import type { Film, DifficulteKey } from "../types/types";

const stylesMap: Record<DifficulteKey, { back: string; badge: string; line: string; chances: number }> = {
  facile: { back: "bg-fb-cream", badge: "bg-fb-dark text-fb-cream", line: "bg-fb-dark", chances: 2 },
  normale: { back: "bg-fb-cream", badge: "bg-fb-dark text-fb-cream", line: "bg-fb-dark", chances: 1 },
  default: { back: "bg-fb-cream", badge: "bg-fb-dark text-fb-cream", line: "bg-fb-dark", chances: 1 },
};

const typeLabels: Record<string, string> = {
  annee: "Année de production", 
  notes: "Appréciation critique", 
  duree: "Métrage", 
  recette: "Recettes commerciales", 
  date: "La première",
};

const modeTitles: Record<string, string> = {
  facile: "Répétition Générale",
  normale: "Prise n°1",
  default: "Plan-Séquence"
};

const formatDisplayValue = (film: Film, gameType: string): string => {
  switch (gameType) {
    case "annee": return film.annee_de_sortie;
    case "date": return film.date_de_sortie;
    case "duree": return `${film.duree_en_minutes} min`;
    case "recette": return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(film.box_office);
    case "notes": return film.note_globale.toString();
    default: return "";
  }
};

export default function Game() {
  const location = useLocation();
  const difficulte = location.state?.difficulte ?? "facile";
  const type = location.state?.type ?? "annee";

  const key = (difficulte === "facile" || difficulte === "normale" ? difficulte : "default") as DifficulteKey;
  const currentStyle = stylesMap[key];
  const typeLabel = typeLabels[type] ?? "Inconnu";
  const currentModeTitle = modeTitles[difficulte] || modeTitles.default;

  const { timeline, activeCard, chancesLeft, isLoading, initGame, handlePlacement } = useGameStore();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "warning" } | null>(null);

  useEffect(() => {
    initGame(difficulte, type, currentStyle.chances);
  }, [difficulte, type, currentStyle.chances, initGame]);

  const processPlacement = (dropIndex: number) => {
    const result = handlePlacement(dropIndex, type);
    
    if (result === 'success') {
      setMessage({ text: "Bien joué !", type: "success" });
    } else if (result === 'warning') {
      setMessage({ text: `Faux ! Il te reste ${chancesLeft - 1} essai(s).`, type: "warning" });
    } else {
      setMessage({ text: "Faux ! La carte est défaussée.", type: "error" });
    }
    
    setTimeout(() => setMessage(null), 2000);
    setIsDragging(false);
    setIsSelected(false);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-fb-dark text-2xl font-bold font-rokkitt bg-fb-cream">Préparation du tournage...</div>;
  }

  const isTypeActive = (currentType: string) => type === currentType;
  const isDateOrAnneeActive = type === "date" || type === "annee";

  return (
    <section className="flex flex-col items-center bg-fb-cream min-h-screen w-full p-3 md:p-6 text-fb-dark font-rokkitt justify-between">
      
      <div className="w-full max-w-7xl flex items-center justify-between mt-2 mb-2 relative">
        <Link 
          to="/Game-Type" 
          state={{ difficulte: difficulte }}
          className="w-10 h-10 text-fb-dark hover:scale-105 transition-transform flex items-center justify-center cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </Link>

        <div className="flex-1 pl-4 md:pl-6 text-left">
          <h2 className="font-limelight uppercase text-fb-red text-2xl md:text-3xl tracking-wide">
            {currentModeTitle}
          </h2>
          <p className="text-base md:text-xl font-bold mt-0.5">{typeLabel}</p>
        </div>

        <h1 className="font-limelight uppercase text-fb-red text-3xl md:text-5xl tracking-wide">
          Flash-Back
        </h1>
      </div>

      <div className="h-1.25 w-full max-w-7xl bg-fb-dark mb-0 rounded-full"></div>

      <main className="w-full flex-1 flex flex-col items-center justify-center py-0 overflow-hidden h-auto my-auto relative">
        
        <div className="absolute top-1 left-1/2 -translate-x-1/2 h-6 flex justify-center items-center z-10">
          {message && (
            <div className={`px-4 py-0.5 border-[3px] border-fb-dark font-limelight uppercase text-xs tracking-wider animate-pulse shadow-md ${message.type === "success" ? "bg-green-600 text-fb-cream" : message.type === "warning" ? "bg-amber-500 text-fb-dark" : "bg-fb-red text-fb-cream"}`}>
              {message.text}
            </div>
          )}
        </div>

        <div className="flex items-center overflow-x-auto w-full max-w-7xl px-4 py-0 min-h-55 md:min-h-70 scrollbar-thin scrollbar-thumb-fb-dark/40">
          
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); processPlacement(0); }}
            onClick={() => isSelected && processPlacement(0)}
            className={`shrink-0 transition-all duration-200 mx-2 flex items-center justify-center cursor-pointer w-16 md:w-24 h-36 md:h-56 border-[3px] border-dashed ${isDragging || isSelected ? "bg-fb-red/10 border-fb-red hover:bg-fb-red/20" : "bg-fb-cream/30 border-fb-dark/30 hover:border-fb-dark/60 hover:bg-fb-dark/5"}`}
          >
            <span className={`text-2xl font-limelight transition-colors duration-200 ${isDragging || isSelected ? "text-fb-red" : "text-fb-dark/30"}`}>+</span>
          </div>

          {timeline.map((film, index) => (
            <React.Fragment key={`${film.id}-${index}`}>
              <div className="shrink-0 scale-90 md:scale-95 transition-transform">
                <Cards film={film} displayValue={formatDisplayValue(film, type)} />
              </div>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); processPlacement(index + 1); }}
                onClick={() => isSelected && processPlacement(index + 1)}
                className={`shrink-0 transition-all duration-200 mx-2 flex items-center justify-center cursor-pointer w-16 md:w-24 h-36 md:h-56 border-[3px] border-dashed ${isDragging || isSelected ? "bg-fb-red/10 border-fb-red hover:bg-fb-red/20" : "bg-fb-cream/30 border-fb-dark/30 hover:border-fb-dark/60 hover:bg-fb-dark/5"}`}
              >
                <span className={`text-2xl font-limelight transition-colors duration-200 ${isDragging || isSelected ? "text-fb-red" : "text-fb-dark/30"}`}>+</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </main>

      <div className="h-1.25 w-full max-w-7xl bg-fb-dark mt-0 mb-4 rounded-full"></div>

      <footer className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 items-stretch min-h-40 mb-2">
        
        <div className="flex-1 border-[5px] border-fb-dark bg-fb-cream/50 p-0 flex flex-col">
          <h3 className="font-limelight bg-fb-dark text-fb-cream text-left text-base md:text-lg py-1 px-4 uppercase tracking-wider w-full">
            Fiche technique
          </h3>
          <div className="w-full p-3 flex-1 flex items-center">
            <table className="w-full text-left border-collapse text-base md:text-xl font-bold tracking-wide">
              <tbody className="divide-y divide-fb-dark/10">
                <tr>
                  <td className="py-0.5 uppercase text-xs md:text-sm text-fb-dark/60 pr-4">Métrage</td>
                  <td className="py-0.5 text-right text-fb-dark">
                    {activeCard ? (isTypeActive("duree") ? "???" : `${activeCard.duree_en_minutes} min`) : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="py-0.5 uppercase text-xs md:text-sm text-fb-dark/60 pr-4">Box Office</td>
                  <td className="py-0.5 text-right text-fb-dark">
                    {activeCard ? (isTypeActive("recette") ? "???" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(activeCard.box_office)) : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="py-0.5 uppercase text-xs md:text-sm text-fb-dark/60 pr-4">Sortie en salles</td>
                  <td className="py-0.5 text-right text-fb-dark">
                    {activeCard ? (isDateOrAnneeActive ? "???" : activeCard.date_de_sortie) : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="py-0.5 uppercase text-xs md:text-sm text-fb-dark/60 pr-4">Note du public</td>
                  <td className="py-0.5 text-right text-fb-dark">
                    {activeCard ? (isTypeActive("notes") ? "??? / 10" : `${activeCard.note_globale} / 10`) : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="py-0.5 uppercase text-xs md:text-sm text-fb-dark/60 pr-4">Genre</td>
                  <td className="py-0.5 text-right text-fb-dark">
                    {activeCard ? activeCard.genres : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center min-h-45 lg:min-h-0 shrink-0 order-first lg:order-0">
          {activeCard ? (
            <div className="flex flex-col items-center justify-center w-full">
              <p className="text-fb-dark/60 text-xs font-bold uppercase tracking-wider mb-2 lg:hidden">Touche la carte puis une zone +</p>
              <div className={`transition-all duration-200 transform hover:scale-105 scale-90 md:scale-95 ${isDragging ? 'opacity-30 scale-85' : 'opacity-100'}`}>
                <Cards 
                  film={activeCard} isDraggable={true} isSelected={isSelected}
                  onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; setTimeout(() => setIsDragging(true), 0); }}
                  onDragEnd={() => setIsDragging(false)}
                  onClick={() => setIsSelected(!isSelected)}
                />
              </div>
            </div>
          ) : (
            <div className="border-[5px] border-fb-dark bg-fb-red text-fb-cream p-4 text-center w-full shadow-lg my-auto">
              <h2 className="font-limelight text-3xl md:text-4xl uppercase tracking-widest">Terminé !</h2>
              <p className="font-medium text-xs md:text-sm mt-1 uppercase tracking-wider">Le tournage est dans la boîte.</p>
            </div>
          )}
        </div>

        <div className="flex-1 border-[5px] border-fb-dark bg-fb-cream/50 p-0 flex flex-col">
          <h3 className="font-limelight bg-fb-dark text-fb-cream text-left text-base md:text-lg py-1 px-4 uppercase tracking-wider w-full">
            Synopsis
          </h3>
          <div className="p-3 text-sm md:text-lg font-bold tracking-wide leading-snug flex-1 flex items-start">
            <p className="line-clamp-5 text-fb-dark opacity-95 text-left">
              {activeCard ? activeCard.synopsis : "Aucune pellicule active."}
            </p>
          </div>
        </div>

      </footer>
    </section>
  );
}