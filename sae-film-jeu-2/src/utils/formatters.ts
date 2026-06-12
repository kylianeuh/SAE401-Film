import type { Film } from "../types/types";

export const formatDisplayValue = (film: Film, gameType: string): string => {
  switch (gameType) {
    case "annee": return film.annee_de_sortie;
    case "date": return film.date_de_sortie;
    case "duree": return `${film.duree_en_minutes} min`;
    case "recette": return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(film.box_office);
    case "notes": return film.note_globale.toString();
    default: return "";
  }
};