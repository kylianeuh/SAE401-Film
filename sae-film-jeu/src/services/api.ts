// src/services/api.ts
import type { Film } from "../types/types";
import filmsDataRaw from "../assets/ma_base_films.json"; // Temporaire

export const fetchFilmsFromAPI = async (): Promise<Film[]> => {
  /* // --- LA VRAIE FAÇON DE FAIRE (Exemple avec TMDB) ---
  try {
    // Utilise les variables d'environnement (.env) pour cacher ta clé API
    const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` }
    });
    const data = await response.json();
    // Ici tu devras probablement formater (mapper) les données de l'API pour qu'elles correspondent à l'interface Film
    return data.results.map(formatToFilmInterface); 
  } catch (error) {
    console.error("Erreur de l'API:", error);
    return [];
  }
  */

  // --- SIMULATION API EN ATTENDANT ---
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(filmsDataRaw as Film[]);
    }, 800); // Simule un temps de chargement de 800ms
  });
};