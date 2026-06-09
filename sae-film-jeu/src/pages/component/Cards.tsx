import React, { useState } from 'react';
import type { Film } from '../../types/types';
import RightClick from './RightClick';

interface CardsProps {
  film: Film;
  displayValue?: string;
  isDraggable?: boolean;
  isSelected?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onClick?: () => void;
}

export default function Cards({ 
  film, 
  displayValue, 
  isDraggable = false, 
  isSelected = false,
  onDragStart, 
  onDragEnd,
  onClick
}: CardsProps) {

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    
    setContextMenu({
      x: e.clientX,
      y: e.clientY
    });
  };

  const closeContextMenu = () => {
    if (contextMenu) setContextMenu(null);
  };

  return (
    <>
      <div 
        draggable={isDraggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onClick={onClick}
        onContextMenu={handleContextMenu} // On écoute le clic droit ici
        className={`relative w-32 h-44 md:w-44 md:h-64 border-2 rounded-2xl overflow-hidden group select-none shrink-0 transform-gpu transition-all duration-200
          ${isDraggable ? 'cursor-grab active:cursor-grabbing hover:scale-105' : ''}
          ${isSelected ? 'ring-4 ring-blue-500 scale-105' : 'border-transparent shadow-lg'}
        `}
      >
        <img 
          src={film.image} 
          alt={film.titre} 
          className='w-full h-full object-cover pointer-events-none select-none' 
        />
        
        <div className='absolute bottom-0 left-0 w-full pt-20 pb-4 px-1 bg-gradient-to-t from-black/90 via-black/70 to-transparent pointer-events-none'>
          <p className='text-white text-xs md:text-sm font-medium text-center line-clamp-2'>
            {film.titre}
          </p>
        </div>

        {displayValue && (
          <div className="absolute top-0 left-0 w-full bg-slate-900/90 text-white text-center py-2 font-bold transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            {displayValue}
          </div>
        )}
      </div>

      <RightClick 
        contextMenu={contextMenu} 
        film={film} 
        closeContextMenu={closeContextMenu} 
      />
    </>
  );
}