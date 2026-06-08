import { Link, useLocation } from 'react-router-dom'
import '../index.css'
import Cards from './component/Cards'

function Game() {
  const location = useLocation()
  const difficulte = location.state?.difficulte ?? 'inconnue'
  const type = location.state?.type ?? 'inconnu'

  // Centralisation et typage des styles (Clean & TypeScript-ready)
  type DifficulteKey = 'facile' | 'normale' | 'default';

  const stylesMap: Record<DifficulteKey, { back: string; badge: string; line: string }> = {
    facile: {
      back: 'bg-light-green-back',
      badge: 'bg-light-green text-light-green',
      line: 'bg-light-green'
    },
    normale: {
      back: 'bg-light-orange-back',
      badge: 'bg-light-orange text-light-orange',
      line: 'bg-light-orange'
    },
    default: {
      back: 'bg-light-red-back',
      badge: 'bg-light-red text-light-red',
      line: 'bg-light-red'
    }
  }

  const key = (difficulte === 'facile' || difficulte === 'normale' ? difficulte : 'default') as DifficulteKey;
  const currentStyle = stylesMap[key]

  const typeLabels: Record<string, string> = {
    annee: 'Année',
    notes: 'Notes',
    duree: 'Durée',
    recette: 'Recette',
    date: 'Date Précise'
  }
  const typeLabel = typeLabels[type] ?? 'Inconnu'

  return (
    <section className={`flex flex-col items-center ${currentStyle.back} min-h-screen w-full px-4 pb-6`}>

      {/* Header : Propre et aligné verticalement sur mobile */}
      <header className='flex flex-col sm:flex-row justify-between items-center w-full max-w-7xl pt-4 gap-4'>
        <div className='flex flex-row sm:flex-col gap-2 w-full sm:w-auto justify-center sm:justify-start'>
          <Link
            to="/"
            className={`uppercase px-4 py-2 ${currentStyle.badge} text-sm md:text-xl font-bold w-32 md:w-52 text-center rounded-lg shadow-sm`}
            style={{ color: currentStyle.badge.split(' ')[1].replace('text-', '') }}
          >
            {difficulte}
          </Link>
          <Link
            to="/game-type"
            state={{ difficulte }}
            className={`uppercase px-4 py-2 ${currentStyle.badge} text-sm md:text-xl font-bold w-32 md:w-52 text-center rounded-lg shadow-sm`}
            style={{ color: currentStyle.badge.split(' ')[1].replace('text-', '') }}
          >
            {typeLabel}
          </Link>
        </div>

        <h1 className='uppercase text-3xl md:text-6xl font-black tracking-wider text-slate-800 text-center sm:text-right p-4'>
          Flash-Back
        </h1>
      </header>

      {/* Ligne de séparation supérieure dynamique */}
      <div className={`h-1 w-full max-w-7xl ${currentStyle.line} opacity-50 my-4 rounded-full`}></div>

      {/* ZONE SLIDER : On retire flex-1 et on le laisse prendre uniquement la hauteur de ses éléments (h-auto) */}
      <main className='w-full py-4 overflow-hidden h-auto'>
        <div className='flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none w-full max-w-full px-[5%] py-2'>

          <div className='snap-center shrink-0 shadow-lg hover:scale-105 transition-transform duration-200 rounded-2xl overflow-hidden'>
            <Cards />
          </div>

          <div className='snap-center shrink-0 shadow-lg hover:scale-105 transition-transform duration-200 rounded-2xl overflow-hidden'>
            <Cards />
          </div>

          <div className='snap-center shrink-0 shadow-lg hover:scale-105 transition-transform duration-200 rounded-2xl overflow-hidden'>
            <Cards />
          </div>

          <div className='snap-center shrink-0 shadow-lg hover:scale-105 transition-transform duration-200 rounded-2xl overflow-hidden'>
            <Cards />
          </div>

          <div className='snap-center shrink-0 shadow-lg hover:scale-105 transition-transform duration-200 rounded-2xl overflow-hidden'>
            <Cards />
          </div>

          <div className='snap-center shrink-0 shadow-lg hover:scale-105 transition-transform duration-200 rounded-2xl overflow-hidden'>
            <Cards />
          </div>

          <div className='snap-center shrink-0 shadow-lg hover:scale-105 transition-transform duration-200 rounded-2xl overflow-hidden'>
            <Cards />
          </div>

          <div className='snap-center shrink-0 shadow-lg hover:scale-105 transition-transform duration-200 rounded-2xl overflow-hidden'>
            <Cards />
          </div>

        </div>
      </main>

      <div className={`h-1 w-full max-w-7xl ${currentStyle.line} opacity-50 my-4 rounded-full`}></div>

      <footer className='w-full max-w-7xl flex-1 flex flex-col justify-start min-h-[200px]'>
        <div className='h-1 w-full hidden md:block ${currentStyle.line} rounded-full my-4'></div>
        <div className='flex items-center w-full gap-2'>
          <div className='flex-1 flex justify-center'>
            <div className='hidden md:flex gap-2 '>
              <div className={`p-2 w-20 text-center rounded-xl ${currentStyle.line} md:hidden`}>
                Info
              </div>
              <div>
                Informations :
                <p>Durée :</p>
                <p>Box Office :</p>
                <p>Réalisateur :</p>
                <p>Note globale :</p>
                <p>Type de Film :</p>
                <p></p>
              </div>
            </div>


            <div className='h-full w-1 hidden md:block ${currentStyle.line} rounded-full'></div>
          </div>

          <div className='w-30 md:w-80 shrink-0 flex justify-center'>
            <Cards />
          </div>

          <div className='flex-1 flex justify-center h-full'>
            <div className={`p-2 w-20 text-center rounded-xl ${currentStyle.line} md:hidden`}>
              Synopsis
            </div>
            <div className='hidden md:flex gap-2 '>
              <div className={`h-full w-1 hidden md:block ${currentStyle.line} rounded-full mx-2`}></div>
              <div className='w-[95%]'>
                Synopsis
                <p>Quelques jours avant leur mariage, la relation amoureuse de Charlie et Emma est complètement chamboulée lorsqu’Emma révèle un secret dérangeant issu de son passé. Ce qui aurait dû être une période remplie d’amour et d’attentes se transforme en crise émotionnelle où Charlie commence à douter de tout ce qu’il croyait savoir sur sa fiancée.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </section>
  )
}

export default Game