import { Link, useLocation } from 'react-router-dom'
import '../index.css'

function Game() {
  const location = useLocation()
  const difficulte = location.state?.difficulte ?? 'inconnue'
  const type = location.state?.type ?? 'inconnu'

  const colorBack = difficulte === 'facile' ? 'bg-light-green-back' : difficulte === 'normale' ? 'bg-light-orange-back' : 'bg-light-red-back'
  const color = difficulte === 'facile' ? 'bg-light-green' : difficulte === 'normale' ? 'bg-light-orange' : 'bg-light-red'
  const colorBorder = difficulte === 'facile' ? 'border-light-green' : difficulte === 'normale' ? 'border-light-orange' : 'border-light-red'
  const typeLabel = type === 'annee' ? 'Année' : type === 'notes' ? 'Notes' : type === 'duree' ? 'Durée' : type === 'recette' ? 'Recette' : type === 'date' ? 'Date Précise' : 'Inconnu'

  return (
    <section className={`flex flex-col items-center ${colorBack} h-screen`}>

      <div className='flex justify-between w-full'>
        <div className='flex flex-col gap-2 m-4 w-80'>
          <Link to="/" className={`uppercase px-4 py-2 ${color} text-2xl font-bold w-52 text-center`} style={{ color: color }}>{difficulte}</Link>
          <Link to="/game-type" state={{difficulte: `${difficulte}` }} className={`uppercase px-4 py-2 ${color} text-2xl font-bold w-52 text-center`} style={{ color: color }}>{typeLabel}</Link>
        </div>
        <h1 className='uppercase text-6xl font-bold p-8'>Flash-Back</h1>
        <div className='flex flex-col gap-2 m-4 w-80 items-end'>
            <div className='w-20 aspect-square rounded-full bg-red-400'></div>
        </div>
      </div>

    </section>
  )
}

export default Game
