import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import "../index.css";
import { useGameStore } from "../store/useGameStore";
import type { DifficulteKey } from "../types/types";

import GameHeader from "../component/GameHeader";
import GameFooter from "../component/GameFooter";
import GameBoard from "../component/GameBoard";
import GameEnd from "../component/GameEnd";
import Cards from "../component/Cards";

const stylesMap: Record<DifficulteKey, { back: string; badge: string; line: string; chances: number }> = {
  facile: { back: "bg-light-green-back", badge: "bg-light-green text-light-green", line: "bg-light-green", chances: Infinity },
  normale: { back: "bg-light-orange-back", badge: "bg-light-orange text-light-orange", line: "bg-light-orange", chances: 3 },
  default: { back: "bg-light-red-back", badge: "bg-light-red text-light-red", line: "bg-light-red", chances: 1 },
};

const typeLabels: Record<string, string> = { annee: "Année", notes: "Notes", duree: "Durée", recette: "Recette", date: "Date Précise" };

export default function Game() {
  const location = useLocation();
  const difficulte = location.state?.difficulte ?? "facile";
  const type = location.state?.type ?? "annee";
  const key = (difficulte === "facile" || difficulte === "normale" ? difficulte : "default") as DifficulteKey;
  const currentStyle = stylesMap[key];

  const store = useGameStore();
  const [isSelected, setIsSelected] = useState(false);
  const [activeDragItem, setActiveDragItem] = useState(false); // Gère l'affichage du DragOverlay
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "warning" } | null>(null);

  // Configuration des capteurs dnd-kit pour gérer la souris et le tactile parfaitement
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  useEffect(() => { store.initGame(difficulte, type, currentStyle.chances); }, [difficulte, type, currentStyle.chances]);

  const processPlacement = (dropIndex: number) => {
    const result = store.handlePlacement(dropIndex, type);
    if (result === 'success') setMessage({ text: "Bien joué !", type: "success" });
    else if (result === 'warning') setMessage({ text: store.globalChancesLeft === Infinity ? "Faux ! Carte défaussée." : `Faux ! Il reste ${store.globalChancesLeft} vie(s).`, type: "warning" });
    
    setTimeout(() => setMessage(null), 2000);
    setIsSelected(false);
  };

  // Événements du DND Kit
  const handleDragStart = () => { setActiveDragItem(true); };
  
  const handleDragEnd = (event: any) => {
    setActiveDragItem(false);
    const { over } = event;
    if (over) {
      processPlacement(over.id); // over.id correspond à l'index de la Zone
    }
  };

  if (store.isLoading) return <div className="min-h-screen flex items-center justify-center font-bold">Chargement...</div>;
  if (store.gameStatus !== 'playing') return <GameEnd gameStatus={store.gameStatus} timelineLength={store.timeline.length} initGame={store.initGame} difficulte={difficulte} type={type} currentStyle={currentStyle} />;

  const isTypeActive = (currentType: string) => type === currentType;
  const isDateOrAnneeActive = type === "date" || type === "annee";

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <section className={`flex flex-col items-center ${currentStyle.back} min-h-screen w-full px-4 pb-6`}>
        
        <GameHeader difficulte={difficulte} typeLabel={typeLabels[type] ?? "Inconnu"} currentStyle={currentStyle} globalChancesLeft={store.globalChancesLeft} deckLength={store.deck.length} hintsCount={store.hintsCount} />
        <div className={`h-1 w-full max-w-7xl ${currentStyle.line} opacity-50 my-4 rounded-full`}></div>
        
        <div className="h-10 w-full flex justify-center items-center">
          {message && <div className={`px-6 py-2 rounded-full text-white font-bold animate-pulse ${message.type === "success" ? "bg-green-500" : "bg-orange-500"}`}>{message.text}</div>}
        </div>

        <GameBoard timeline={store.timeline} isSelected={isSelected} processPlacement={processPlacement} type={type} />
        <div className={`h-1 w-full max-w-7xl ${currentStyle.line} opacity-50 my-4 rounded-full`}></div>
        
        <GameFooter activeCard={store.activeCard} type={type} isSelected={isSelected} setIsSelected={setIsSelected} currentStyle={currentStyle} generateHint={store.generateHint} hintsCount={store.hintsCount} currentHint={store.currentHint} />
        
        {/* Le DragOverlay suit le curseur/doigt pendant le déplacement */}
        <DragOverlay dropAnimation={{ duration: 200 }}>
          {activeDragItem && store.activeCard ? <Cards film={store.activeCard} /> : null}
        </DragOverlay>

      </section>
    </DndContext>
  );
}