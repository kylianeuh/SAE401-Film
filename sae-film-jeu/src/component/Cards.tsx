import React from 'react';
import type { Film } from '../types/types';
import RightClick from './RightClick';

interface CardsProps {
  film: Film;
  displayValue?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function Cards({ film, displayValue, isSelected = false, onClick }: CardsProps) {
  const [contextMenu, setContextMenu] = React.useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => { if (contextMenu) setContextMenu(null); };

  return (
    <>
      <div 
        onClick={onClick}
        onContextMenu={handleContextMenu}
        className={`relative w-36 h-60 md:w-44 md:h-72 bg-fb-dark flex flex-col p-4.5 select-none shrink-0 transform-gpu transition-all duration-200 cursor-pointer shadow-xl z-20
          [mask-image:url(/src/assets/format-carte.svg)] [mask-size:100%_100%] [mask-repeat:no-repeat]
          ${isSelected ? 'scale-105 ring-4 ring-fb-red' : 'hover:scale-[1.02]'}
        `}
      >
        
        <div className="w-full h-full border-[1.5px] border-fb-cream flex flex-col justify-between overflow-hidden relative ">
          
          <div className="w-full flex-1 relative bg-fb-dark overflow-hidden">
            <img 
              src={film.image} 
              alt={film.titre} 
              className="w-full h-full object-cover pointer-events-none select-none" 
            />
            
            {displayValue && (
              <div className="absolute top-0 left-0 w-full bg-fb-dark/95 text-fb-cream text-center py-0.5 font-limelight text-[10px] tracking-wider uppercase border-b border-fb-cream/30">
                {displayValue}
              </div>
            )}
          </div>

          <div className="w-full bg-fb-red border-t-[1.5px] border-fb-cream/90 py-1 px-1.5 text-center shrink-0 flex items-center justify-center min-h-[28px] h-auto">
            <p className="text-fb-cream text-[11px] md:text-xs font-rokkitt font-bold leading-tight tracking-wide w-full break-words text-center">
              {film.titre}
            </p>
          </div>

        </div>

      </div>

      <RightClick contextMenu={contextMenu} film={film} closeContextMenu={closeContextMenu} />
    </>
  );
}