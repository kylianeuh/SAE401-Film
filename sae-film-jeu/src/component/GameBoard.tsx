import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Cards from './Cards';
import { formatDisplayValue } from '../utils/formatters';

export default function GameBoard({ timeline, isSelected, processPlacement, type }: any) {
  
  const Zone = ({ index }: { index: number }) => {
    const { isOver, setNodeRef } = useDroppable({ id: index });

    return (
      <div
        ref={setNodeRef}
        onClick={() => isSelected && processPlacement(index)}
        className={`shrink-0 transition-all duration-200 mx-2 flex items-center justify-center cursor-pointer w-16 md:w-24 h-44 md:h-64 border-2 border-dashed border-fb-red/60
          ${isOver ? "bg-fb-red/20 scale-105" : "bg-[#EADCB9] hover:bg-[#dfcfab]"}`}
      >
        <span className="text-fb-red font-limelight text-2xl md:text-3xl">+</span>
      </div>
    );
  };

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center relative z-10">
      
      <div className="h-1.5 w-full max-w-7xl bg-fb-dark full"></div>

      <div className="flex items-center overflow-x-auto w-full max-w-7xl px-2 py-2 min-h-[220px] md:min-h-[280px] scrollbar-thin scrollbar-thumb-fb-dark/40">
        <div className="flex items-center min-w-full justify-start">
          
          <Zone index={0} />
          
          {timeline.map((film: any, index: number) => (
            <React.Fragment key={`${film.id}-${index}`}>
              <div className="shrink-0 scale-90 md:scale-95 transition-transform">
                <Cards film={film} displayValue={formatDisplayValue(film, type)} />
              </div>
              <Zone index={index + 1} />
            </React.Fragment>
          ))}

        </div>
      </div>

      <div className="h-1.5 w-full max-w-7xl bg-fb-dark full"></div>

    </main>
  );
}