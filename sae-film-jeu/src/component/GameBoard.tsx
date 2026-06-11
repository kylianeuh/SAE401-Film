import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Cards from './Cards';
import { formatDisplayValue } from '../utils/formatters';

export default function GameBoard({ timeline, isSelected, processPlacement, type }: any) {
  
  // Sous-composant Droppable pour les zones de dépôt
  const Zone = ({ index }: { index: number }) => {
    const { isOver, setNodeRef } = useDroppable({ id: index });

    return (
      <div
        ref={setNodeRef}
        onClick={() => isSelected && processPlacement(index)}
        className={`shrink-0 transition-colors duration-200 rounded-xl mx-2 flex items-center justify-center cursor-pointer w-16 md:w-24 h-44 md:h-64 border-2 border-dashed
          ${isOver || isSelected ? "bg-slate-800/10 border-slate-800/50 hover:bg-slate-800/20" : "bg-transparent border-slate-800/30 hover:border-slate-800/50 hover:bg-slate-800/5"}
        `}
      >
        <span className={`text-2xl font-bold transition-colors duration-200 ${isOver || isSelected ? "text-slate-800" : "text-slate-800/40"}`}>+</span>
      </div>
    );
  };

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center py-4 overflow-hidden h-auto gap-8">
      <div className="flex items-center overflow-x-auto w-full max-w-full px-[5%] py-6 min-h-[300px] scrollbar-thin scrollbar-thumb-slate-400">
        <Zone index={0} />
        {timeline.map((film: any, index: number) => (
          <React.Fragment key={`${film.id}-${index}`}>
            <Cards film={film} displayValue={formatDisplayValue(film, type)} />
            <Zone index={index + 1} />
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}