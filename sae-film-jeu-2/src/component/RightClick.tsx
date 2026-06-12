import React, { useEffect } from 'react';
import type { Film } from '../types/types';

// 1. On définit l'interface pour les propriétés (props) que le composant va recevoir
interface RightClickProps {
  contextMenu: { x: number; y: number } | null;
  film: Film;
  closeContextMenu: () => void;
}

// 2. On crée le composant fonctionnel
export default function RightClick({ contextMenu, film, closeContextMenu }: RightClickProps) {
  
  // On déplace le useEffect ici pour que le menu gère lui-même sa fermeture au clic extérieur
  useEffect(() => {
    window.addEventListener('click', closeContextMenu);
    return () => window.removeEventListener('click', closeContextMenu);
  }, [closeContextMenu]);

  // Si le menu n'est pas ouvert, on ne rend rien du tout
  if (!contextMenu) return null;

  const tmdbUrl = `https://www.themoviedb.org/movie/${film.id}`;

  return (
    <div 
      className="fixed z-50 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden w-48 text-sm"
      style={{ top: contextMenu.y, left: contextMenu.x }}
      onClick={(e) => e.stopPropagation()} // Évite de déclencher le onClick de la carte en dessous
    >
      <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 font-semibold text-slate-700 truncate">
        {film.titre}
      </div>
      <ul className="py-1">
        <li>
          <a 
            href={tmdbUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            onClick={closeContextMenu} // Ferme le menu après le clic
          >
            Ouvrir sur TMDB ↗
          </a>
        </li>
        <li>
          <button 
            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            onClick={closeContextMenu}
          >
            Fermer
          </button>
        </li>
      </ul>
    </div>
  );
}