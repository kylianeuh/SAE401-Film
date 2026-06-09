import pandas as pd
import requests
import json
import time

# --- CONFIGURATION ---
API_KEY = "7f99cb25a73a03585658e036a85a06d3" 
CSV_FILE = "id-films-2.csv"
OUTPUT_FILE = "ma_base_films.json"
BASE_URL = "https://api.themoviedb.org/3/movie/"

def get_movie_details(movie_id):
    params = {
        "api_key": API_KEY,
        "language": "fr-FR"
    }
    
    try:
        response = requests.get(f"{BASE_URL}{movie_id}", params=params)
        
        if response.status_code == 200:
            data = response.json()

            release_date = data.get('release_date', '')
            year = release_date.split('-')[0] if release_date else None
            
            genres_names = [g['name'] for g in data.get('genres', [])]
            
            return {
                "id": data.get('id'),
                "image": f"https://image.tmdb.org/t/p/original{data.get('poster_path')}" if data.get('poster_path') else None,
                "titre": data.get('title'),
                "titre_original": data.get('original_title'),
                "date_de_sortie": release_date,
                "annee_de_sortie": year,
                "duree_en_minutes": data.get('runtime'),
                "tagline": data.get('tagline'),
                "box_office": data.get('revenue'),
                "note_globale": data.get('vote_average'),
                "nombre_de_vote": data.get('vote_count'),
                "genres": genres_names,
                "synopsis": data.get('overview')
            }
        elif response.status_code == 429:
            print("Limite atteinte, pause forcée de 5 secondes...") # Vraiment au cas ou, pas sencé arriver
            time.sleep(5)
            return get_movie_details(movie_id) # Réessaye
        else:
            print(f"Erreur {response.status_code} pour l'ID {movie_id}")
            return None
            
    except Exception as e:
        print(f"Erreur de connexion pour l'ID {movie_id}: {e}")
        return None

def main():
    # Lire le CSV 
    try:
        df = pd.read_csv(CSV_FILE)
        movie_ids = df['id'].dropna().unique().tolist()
    except Exception as e:
        print(f"Impossible de lire le fichier CSV : {e}")
        return

    all_movies_data = []
    total = len(movie_ids)
    
    print(f"Début de l'extraction de {total} films...")

    for index, m_id in enumerate(movie_ids):
        # Récupérer les infos
        movie_info = get_movie_details(int(m_id))
        
        if movie_info:
            all_movies_data.append(movie_info)
            print(f"[{index+1}/{total}] Récupéré : {movie_info['titre']}")
        
        # Gestion de la limite (Rate Limit)
        # 40 requêtes / 10 sec = 1 requête toutes les 0.25 sec.
        # On utilise 0.3 sec par sécurité pour être large.
        time.sleep(0.3)

    # Sauvegarde finale en JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_movies_data, f, ensure_ascii=False, indent=4)
    
    print(f"\nExtraction terminée ! {len(all_movies_data)} films enregistrés dans {OUTPUT_FILE}")

if __name__ == "__main__":
    main()