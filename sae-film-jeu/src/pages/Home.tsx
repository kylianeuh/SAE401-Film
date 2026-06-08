// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { Link } from 'react-router-dom';
import '../index.css'

function Home() {

  return (
    <section className='flex flex-col items-center bg-cloud h-screen'>

      <h1 className='uppercase text-4xl md:text-6xl font-bold p-8'>Flash-Back</h1>
      
      <h2 className='text-3xl p-4'>Règles du jeux</h2>
      <ul className='flex-grow'>
        <li>regles 1</li>
        <li>regles 2</li>
        <li>regles 3</li>
      </ul>
      

      <ul className='flex w-full'>
        <Link to="/Game-Type" state={{ difficulte: 'facile' }} className='flex flex-1 border-t h-24 md:h-60 hover:bg-light-green bg-light-green/60 hover:text-4xl ease-in-out duration-150 transition text-xl md:text-3xl justify-center items-center'>Facile</Link>
        <Link to="/Game-Type" state={{ difficulte: 'normale' }} className='flex flex-1 border-t border-l h-24 md:h-60 hover:bg-light-orange bg-light-orange/60 hover:text-4xl ease-in-out duration-150  transition text-xl md:text-3xl justify-center items-center'>Normale</Link>
        <Link to="/Game-Type" state={{ difficulte: 'difficile' }} className='flex flex-1 border-t border-l h-24 md:h-60 hover:bg-light-red bg-light-red/60 hover:text-4xl ease-in-out duration-150  transition text-xl md:text-3xl justify-center items-center'>Difficile</Link>
        
      </ul>

    </section>
  )
}

export default Home
