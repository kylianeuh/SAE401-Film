export interface Film {
    id: number;
    image: string;
    titre: string;
    titre_original: string;
    date_de_sortie: string;
    annee_de_sortie: string;
    duree_en_minutes: number;
    tagline: string;
    box_office: number;
    note_globale: number;
    nombre_de_vote: number;
    genres: string[];
    synopsis: string;
  }
  
  export type DifficulteKey = "facile" | "normale" | "default";