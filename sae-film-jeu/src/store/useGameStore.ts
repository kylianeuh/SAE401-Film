import { create } from "zustand";
import type { Film } from "../types/types";
import { fetchFilmsFromAPI } from "../services/api";

interface GameState {
  deck: Film[];
  timeline: Film[];
  activeCard: Film | null;
  globalChancesLeft: number;
  gameStatus: "playing" | "won" | "lost";
  isLoading: boolean;
  hintsCount: number;
  consecutiveWins: number;
  currentHint: string | null;
  initGame: (
    difficulte: string,
    type: string,
    maxChances: number
  ) => Promise<void>;
  handlePlacement: (
    dropIndex: number,
    type: string
  ) => "success" | "warning" | "lost";
  generateHint: (gameType: string) => void;
}

const getFilmValue = (f: Film, t: string): number =>
  t === "annee"
    ? parseInt(f.annee_de_sortie)
    : t === "date"
    ? new Date(f.date_de_sortie).getTime()
    : t === "duree"
    ? f.duree_en_minutes
    : t === "recette"
    ? f.box_office
    : t === "notes"
    ? f.note_globale
    : 0;

export const useGameStore = create<GameState>((set, get) => ({
  deck: [],
  timeline: [],
  activeCard: null,
  globalChancesLeft: 0,
  gameStatus: "playing",
  isLoading: true,
  hintsCount: 1,
  consecutiveWins: 0,
  currentHint: null,

  initGame: async (difficulte, type, maxChances) => {
    set({ isLoading: true, gameStatus: "playing" });
    const films = await fetchFilmsFromAPI();
    const shuffled = [...films].sort(() => Math.random() - 0.5);
    const gameCards = shuffled.slice(0, 30);
    set({
      timeline: [gameCards[0]],
      activeCard: gameCards[1],
      deck: gameCards.slice(2),
      globalChancesLeft: maxChances,
      isLoading: false,
      hintsCount: 1,
      consecutiveWins: 0,
      currentHint: null,
    });
  },

  generateHint: (gameType) => {
    const { hintsCount, activeCard, currentHint } = get();
    if (hintsCount <= 0 || !activeCard || currentHint) return;
    let hint = "";
    if (gameType === "annee")
      hint = `Décennie : ${
        Math.floor(parseInt(activeCard.annee_de_sortie) / 10) * 10
      }s`;
    if (gameType === "notes")
      hint =
        activeCard.note_globale >= Math.floor(activeCard.note_globale) + 0.5
          ? `+ de ${Math.floor(activeCard.note_globale)}.5`
          : `- de ${Math.floor(activeCard.note_globale) + 1}`;
    if (gameType === "date") hint = `Année : ${activeCard.annee_de_sortie}`;
    if (gameType === "duree")
      hint = `${activeCard.duree_en_minutes * 60} secondes`;
    if (gameType === "recette") {
      const fmt = (n: number) =>
        new Intl.NumberFormat("en-US", { notation: "compact" }).format(n);
      const opts = [
        activeCard.box_office,
        activeCard.box_office * 0.7,
        activeCard.box_office * 1.3,
      ].sort(() => Math.random() - 0.5);
      hint = `Choix : ${fmt(opts[0])} / ${fmt(opts[1])} / ${fmt(opts[2])}`;
    }
    set({ hintsCount: hintsCount - 1, currentHint: hint });
  },

  handlePlacement: (dropIndex, type) => {
    const state = get();
    if (!state.activeCard || state.gameStatus !== "playing") return "warning";
    const val = getFilmValue(state.activeCard, type);
    const isCorrect =
      (dropIndex === 0 ||
        val >= getFilmValue(state.timeline[dropIndex - 1], type)) &&
      (dropIndex === state.timeline.length ||
        val <= getFilmValue(state.timeline[dropIndex], type));

    if (isCorrect) {
      const newWins = state.consecutiveWins + 1;
      const newTimeline = [...state.timeline];
      newTimeline.splice(dropIndex, 0, state.activeCard);

      set({
        timeline: newTimeline,
        activeCard: state.deck[0] || null,
        deck: state.deck.slice(1),
        consecutiveWins: newWins,
        hintsCount: state.hintsCount + (newWins % 5 === 0 ? 1 : 0),
        currentHint: null,
        gameStatus: state.deck.length === 0 ? "won" : "playing",
      });
      return "success";
    } else {
      const remaining = state.globalChancesLeft - 1;
      set({ consecutiveWins: 0, currentHint: null }); // Reset combo
      if (state.globalChancesLeft === Infinity) {
        set({
          activeCard: state.deck[0] || null,
          deck: state.deck.slice(1),
          gameStatus: state.deck.length === 0 ? "won" : "playing",
        });
        return "warning";
      }
      if (remaining > 0) {
        set({
          globalChancesLeft: remaining,
          activeCard: state.deck[0] || null,
          deck: state.deck.slice(1),
          gameStatus: state.deck.length === 0 ? "won" : "playing",
        });
        return "warning";
      }
      set({ globalChancesLeft: 0, gameStatus: "lost" });
      return "lost";
    }
  },
}));
