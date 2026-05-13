import { Link, useLocation } from 'react-router-dom'
import '../index.css'

function GameType() {
  const location = useLocation()
  const difficulte = location.state?.difficulte ?? 'inconnue'

  const colorBack = difficulte === 'facile' ? 'bg-light-green-back' : difficulte === 'normale' ? 'bg-light-orange-back' : 'bg-light-red-back'
  const color = difficulte === 'facile' ? 'bg-light-green' : difficulte === 'normale' ? 'bg-light-orange' : 'bg-light-red'
  const colorBorder = difficulte === 'facile' ? 'border-light-green' : difficulte === 'normale' ? 'border-light-orange' : 'border-light-red'

  return (
    <section className={`flex flex-col items-center ${colorBack} h-screen`}>


      <div className='flex justify-between w-full'>
        <div className='flex flex-col gap-2 m-4 w-80'>
          <span className={`uppercase px-4 py-2 ${color} text-2xl font-bold w-52 text-center`} style={{ color: color }}>{difficulte}</span>
          <span className={`uppercase px-4 py-2 ${color} text-2xl font-bold w-52 text-center`} style={{ color: color }}>??</span>
        </div>
        <h1 className='uppercase text-6xl font-bold p-8'>Flash-Back</h1>
        <div className='flex flex-col gap-2 m-4 w-80 items-end'>
            <div className='w-20 aspect-square rounded-full bg-red-400'></div>
        </div>
      </div>

      <ul className='flex flex-col gap-4'>
        <Link to="/game" className='border w-64 p-4 px-8 flex justify-center items-center text-2xl hover:font-bold' state={{ type: 'annee', difficulte: `${difficulte}` }}>Année de sortie</Link>
        <Link to="/game" className='border w-64 p-4 px-8 flex justify-center items-center text-2xl hover:font-bold' state={{ type: 'notes', difficulte: `${difficulte}` }}>Notes</Link>
        <Link to="/game" className='border w-64 p-4 px-8 flex justify-center items-center text-2xl hover:font-bold' state={{ type: 'duree', difficulte: `${difficulte}` }}>Durée</Link>
        <Link to="/game" className='border w-64 p-4 px-8 flex justify-center items-center text-2xl hover:font-bold' state={{ type: 'recette', difficulte: `${difficulte}` }}>Recette</Link>
        <Link to="/game" className='border w-64 p-4 px-8 flex justify-center items-center text-2xl hover:font-bold' state={{ type: 'date', difficulte: `${difficulte}` }}>Date Précise</Link>
      </ul>


    </section>
  )
}

export default GameType
