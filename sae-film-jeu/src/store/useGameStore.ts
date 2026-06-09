// src/store/useGameStore.ts
import { create } from 'zustand';
import type { Film } from '../types/types';
import { fetchFilmsFromAPI } from '../services/api';

interface GameState {
  // États
  deck: Film[];
  timeline: Film[];
  activeCard: Film | null;
  chancesLeft: number;
  isLoading: boolean;
  
  // Actions
  initGame: (difficulte: string, type: string, maxChances: number) => Promise<void>;
  handlePlacement: (dropIndex: number, type: string) => 'success' | 'warning' | 'error';
}

// Fonction utilitaire interne au store
const getFilmValue = (film: Film, gameType: string): number => {
  switch (gameType) {
    case "annee": return parseInt(film.annee_de_sortie);
    case "date": return new Date(film.date_de_sortie).getTime();
    case "duree": return film.duree_en_minutes;
    case "recette": return film.box_office;
    case "notes": return film.note_globale;
    default: return 0;
  }
};

export const useGameStore = create<GameState>((set, get) => ({
  deck: [],
  timeline: [],
  activeCard: null,
  chancesLeft: 0,
  isLoading: true,

  initGame: async (difficulte, type, maxChances) => {
    set({ isLoading: true });
    
    // Appel à l'API
    const films = await fetchFilmsFromAPI();
    
    // Mélange (Fisher-Yates)
    const shuffled = [...films];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const numberOfCards = difficulte === "facile" ? 30 : 30;
    const gameCards = shuffled.slice(0, numberOfCards);

    set({
      timeline: [gameCards[0]],
      activeCard: gameCards[1],
      deck: gameCards.slice(2),
      chancesLeft: maxChances,
      isLoading: false
    });
  },

  handlePlacement: (dropIndex, type) => {
    const state = get();
    if (!state.activeCard) return 'error';

    const valueToPlace = getFilmValue(state.activeCard, type);
    let isCorrect = true;

    // Vérification
    if (dropIndex > 0 && valueToPlace < getFilmValue(state.timeline[dropIndex - 1], type)) isCorrect = false;
    if (dropIndex < state.timeline.length && valueToPlace > getFilmValue(state.timeline[dropIndex], type)) isCorrect = false;

    if (isCorrect) {
      // Victoire sur cette carte
      const newTimeline = [...state.timeline];
      newTimeline.splice(dropIndex, 0, state.activeCard);
      
      const nextCard = state.deck.length > 0 ? state.deck[0] : null;
      const newDeck = state.deck.slice(1);

      set({
        timeline: newTimeline,
        activeCard: nextCard,
        deck: newDeck,
      });
      return 'success';
      
    } else {
      // Erreur
      const remaining = state.chancesLeft - 1;
      
      if (remaining > 0) {
        set({ chancesLeft: remaining });
        return 'warning';
      } else {
        // Défausse de la carte
        const nextCard = state.deck.length > 0 ? state.deck[0] : null;
        const newDeck = state.deck.slice(1);
        set({
          activeCard: nextCard,
          deck: newDeck,
        });
        return 'error';
      }
    }
  }
}));