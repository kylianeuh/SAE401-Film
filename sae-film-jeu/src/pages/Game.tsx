import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css";
import Cards from "./component/Cards";
import { useGameStore } from "../store/useGameStore";
import type { Film, DifficulteKey } from "../types/types";

// --- CONSTANTES VISUELLES ---
const stylesMap: Record<DifficulteKey, { back: string; badge: string; line: string; chances: number }> = {
  facile: { back: "bg-light-green-back", badge: "bg-light-green text-light-green", line: "bg-light-green", chances: 2 },
  normale: { back: "bg-light-orange-back", badge: "bg-light-orange text-light-orange", line: "bg-light-orange", chances: 1 },
  default: { back: "bg-light-red-back", badge: "bg-light-red text-light-red", line: "bg-light-red", chances: 1 },
};

const typeLabels: Record<string, string> = {
  annee: "Année", notes: "Notes", duree: "Durée", recette: "Recette", date: "Date Précise",
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

// --- COMPOSANT ---
export default function Game() {
  const location = useLocation();
  const difficulte = location.state?.difficulte ?? "inconnue";
  const type = location.state?.type ?? "annee";

  const key = (difficulte === "facile" || difficulte === "normale" ? difficulte : "default") as DifficulteKey;
  const currentStyle = stylesMap[key];
  const typeLabel = typeLabels[type] ?? "Inconnu";

  // --- ZUSTAND STORE ---
  const { timeline, activeCard, chancesLeft, isLoading, initGame, handlePlacement } = useGameStore();

  // --- ÉTATS LOCAUX (UI uniquement) ---
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "warning" } | null>(null);

  // --- INITIALISATION ---
  useEffect(() => {
    initGame(difficulte, type, currentStyle.chances);
  }, [difficulte, type, currentStyle.chances, initGame]);

  // --- GESTION DES ACTIONS ---
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
    return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Chargement de la partie...</div>;
  }

  return (
    <section className={`flex flex-col items-center ${currentStyle.back} min-h-screen w-full px-4 pb-6`}>
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-center w-full max-w-7xl pt-4 gap-4">
        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto justify-center sm:justify-start">
          <Link to="/" className={`uppercase px-4 py-2 ${currentStyle.badge} text-sm md:text-xl font-bold w-32 md:w-52 text-center rounded-lg shadow-sm`}>
            {difficulte}
          </Link>
          <div className={`uppercase px-4 py-2 ${currentStyle.badge} text-sm md:text-xl font-bold w-32 md:w-52 text-center rounded-lg shadow-sm`}>
            {typeLabel}
          </div>
        </div>
        <h1 className="uppercase text-3xl md:text-6xl font-black tracking-wider text-slate-800 text-center sm:text-right p-4">
          Flash-Back
        </h1>
      </header>

      <div className={`h-1 w-full max-w-7xl ${currentStyle.line} opacity-50 my-4 rounded-full`}></div>

      {/* MESSAGES */}
      <div className="h-10 w-full max-w-xl flex justify-center items-center">
        {message && (
          <div className={`px-6 py-2 rounded-full text-white font-bold animate-pulse ${message.type === "success" ? "bg-green-500" : message.type === "warning" ? "bg-orange-500" : "bg-red-500"}`}>
            {message.text}
          </div>
        )}
      </div>

      {/* PLATEAU DE JEU */}
      <main className="w-full flex-1 flex flex-col items-center justify-center py-4 overflow-hidden h-auto gap-8">
        <div className="flex items-center overflow-x-auto w-full max-w-full px-[5%] py-6 min-h-[300px] scrollbar-thin scrollbar-thumb-slate-400">
          
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); processPlacement(0); }}
            onClick={() => isSelected && processPlacement(0)}
            className={`shrink-0 transition-colors duration-200 rounded-xl mx-2 flex items-center justify-center cursor-pointer w-16 md:w-24 h-44 md:h-64 border-2 border-dashed ${isDragging || isSelected ? "bg-slate-800/10 border-slate-800/50 hover:bg-slate-800/20" : "bg-transparent border-slate-800/30 hover:border-slate-800/50 hover:bg-slate-800/5"}`}
          >
            <span className={`text-2xl font-bold transition-colors duration-200 ${isDragging || isSelected ? "text-slate-800" : "text-slate-800/40"}`}>+</span>
          </div>

          {timeline.map((film, index) => (
            <React.Fragment key={`${film.id}-${index}`}>
              <Cards film={film} displayValue={formatDisplayValue(film, type)} />
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); processPlacement(index + 1); }}
                onClick={() => isSelected && processPlacement(index + 1)}
                className={`shrink-0 transition-colors duration-200 rounded-xl mx-2 flex items-center justify-center cursor-pointer w-16 md:w-24 h-44 md:h-64 border-2 border-dashed ${isDragging || isSelected ? "bg-slate-800/10 border-slate-800/50 hover:bg-slate-800/20" : "bg-transparent border-slate-800/30 hover:border-slate-800/50 hover:bg-slate-800/5"}`}
              >
                <span className={`text-2xl font-bold transition-colors duration-200 ${isDragging || isSelected ? "text-slate-800" : "text-slate-800/40"}`}>+</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </main>

      <div className={`h-1 w-full max-w-7xl ${currentStyle.line} opacity-50 my-4 rounded-full`}></div>

      {/* FOOTER */}
      <footer className="w-full max-w-7xl flex flex-col justify-start min-h-[200px]">
        <div className="flex items-center w-full gap-2">
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex gap-2">
              <div className="text-sm md:text-base flex flex-col gap-2">
                <span className="font-bold underline mb-2 block">Infos de la carte :</span>
                <p className={`border rounded-2xl p-2`}>Durée : {activeCard ? type === "duree" ? "???" : `${activeCard.duree_en_minutes} min` : "-"}</p>
                <p className={`border rounded-2xl p-2`}>Box Office : {activeCard ? type === "recette" ? "???" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(activeCard.box_office) : "-"}</p>
                <p className={`border rounded-2xl p-2`}>Date de sortie : {activeCard ? type === "date" || "annee" ? "???" : activeCard.date_de_sortie : "-"}</p>
                <p className={`border rounded-2xl p-2`}>Note : {activeCard ? type === "notes" ? "???/10" : activeCard.note_globale : "-"}</p>
                <p className={`border rounded-2xl p-2`}>Genre : {activeCard ? type === "null" ? "???" : activeCard.genres : " "}</p>
              </div>
            </div>
            <div className={`h-full w-1 hidden md:block ${currentStyle.line} rounded-full ml-4`}></div>
          </div>

          <div className="h-44 md:h-64 flex flex-col items-center justify-center relative w-full max-w-sm">
            {activeCard ? (
              <>
                <p className="text-slate-600 text-sm mb-2 md:hidden">Touche la carte puis une zone</p>
                <div className={`transition-opacity ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
                  <Cards 
                    film={activeCard} isDraggable={true} isSelected={isSelected}
                    onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; setTimeout(() => setIsDragging(true), 0); }}
                    onDragEnd={() => setIsDragging(false)}
                    onClick={() => setIsSelected(!isSelected)}
                  />
                </div>
              </>
            ) : (
              <h2 className="text-4xl font-bold text-slate-800">Terminé ! 🎉</h2>
            )}
          </div>

          <div className="flex-1 flex justify-center h-full">
            <div className="hidden md:flex gap-2">
              <div className={`h-full w-1 hidden md:block ${currentStyle.line} rounded-full mx-2`}></div>
              <div className="w-[95%] text-sm md:text-base">
                <span className="font-bold underline mb-2 block">Synopsis :</span>
                <p className="line-clamp-6">{activeCard ? activeCard.synopsis : "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}