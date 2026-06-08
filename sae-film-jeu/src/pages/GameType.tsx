import { Link, useLocation } from 'react-router-dom'
import '../index.css'

function GameType() {
  const location = useLocation()
  const difficulte = location.state?.difficulte ?? 'inconnue'

// 1. Définition stricte des clés acceptées
type DifficulteKey = 'facile' | 'normale' | 'default';

// 2. On type l'objet avec Record pour que TS accepte l'indexation dynamique
const stylesMap: Record<DifficulteKey, { back: string; badge: string; border: string }> = {
  facile: {
    back: 'bg-light-green-back',
    badge: 'bg-light-green text-light-green',
    border: 'border-light-green hover:bg-light-green/10'
  },
  normale: {
    back: 'bg-light-orange-back',
    badge: 'bg-light-orange text-light-orange',
    border: 'border-light-orange hover:bg-light-orange/10'
  },
  default: {
    back: 'bg-light-red-back',
    badge: 'bg-light-red text-light-red',
    border: 'border-light-red hover:bg-light-red/10'
  }
}

// 3. On force TS à considérer la clé comme valide, sinon on utilise 'default'
const key = (difficulte === 'facile' || difficulte === 'normale' ? difficulte : 'default') as DifficulteKey;
const currentStyle = stylesMap[key];

  // Configuration des boutons pour éviter la répétition de code (DRY)
  const menuItems = [
    { type: 'annee', label: 'Année de sortie' },
    { type: 'notes', label: 'Notes' },
    { type: 'duree', label: 'Durée' },
    { type: 'recette', label: 'Recette' },
    { type: 'date', label: 'Date Précise' },
  ]

  return (
    <section className={`flex flex-col items-center ${currentStyle.back} min-h-screen w-full px-4 pb-12`}>
      
      {/* Header : Responsive Grid */}
      <header className='grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-7xl pt-4 md:pt-8 items-center mb-12 md:mb-20'>
        
        {/* Badges Difficulté (À gauche sur Desktop, prend 2 cols sur Mobile si besoin, ou reste discret) */}
        <div className='flex flex-col gap-2 order-2 md:order-1 col-span-2 md:col-span-1 items-center md:items-start'>
          <span className={`uppercase px-4 py-2 ${currentStyle.badge} text-xl md:text-2xl font-bold w-48 text-center rounded-lg shadow-sm`} style={{ color: currentStyle.badge.split(' ')[1].replace('text-', '') }}>
            {difficulte}
          </span>
          <span className={`uppercase px-4 py-2 ${currentStyle.badge} text-xl md:text-2xl font-bold w-48 text-center rounded-lg shadow-sm`} style={{ color: currentStyle.badge.split(' ')[1].replace('text-', '') }}>
            ??
          </span>
        </div>

        {/* Titre (Centré au milieu sur Desktop, tout en haut sur Mobile) */}
        <h1 className='uppercase text-4xl sm:text-5xl md:text-6xl font-black text-center order-1 md:order-2 col-span-2 md:col-span-1 tracking-wider text-slate-800'>
          Flash-Back
        </h1>

        {/* Avatar / Profil (À droite) */}
        <div className='flex order-3 col-span-2 md:col-span-1 justify-center md:justify-end mt-2 md:mt-0'>
          <div className='hidden md:block w-14 md:w-20 aspect-square rounded-full bg-red-400 border-4 border-white shadow-md hover:scale-105 transition-transform cursor-pointer'></div>
        </div>
        
      </header>

      {/* Liste des types de jeu */}
      <main className='w-full max-w-md flex-1 flex flex-col justify-center mb-12'>

      <p>Choisissez le mode de jeu :</p>
      
        <ul className='flex flex-col gap-4 w-full'>
          {menuItems.map((item) => (
            <li key={item.type}>
              <Link 
                to="/game" 
                className={`border-2 ${currentStyle.border} bg-white/60 backdrop-blur-sm w-full py-4 px-8 flex justify-center items-center text-xl md:text-2xl font-semibold rounded-xl shadow-sm transition-all duration-200 hover:font-bold hover:shadow-md hover:-translate-y-0.5 active:translate-y-0`} 
                state={{ type: item.type, difficulte: difficulte }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>

    </section>
  )
}

export default GameType