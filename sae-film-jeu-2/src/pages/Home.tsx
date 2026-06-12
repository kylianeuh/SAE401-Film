import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="flex flex-col items-center bg-fb-cream min-h-screen p-3 md:p-6 relative text-fb-dark font-rokkitt">
      
      <div className="w-full max-w-7xl flex items-center justify-between mt-2 mb-4 relative">
        
        <div className="w-8 h-8 md:w-10 md:h-10 invisible"></div>

        <h1 className="font-limelight uppercase text-fb-red text-4xl md:text-7xl tracking-wide text-center flex-1">
          Flash-Back
        </h1>
        
        <Link 
          to="/Profil" 
          className="w-8 h-8 md:w-10 md:h-10 text-fb-dark hover:scale-105 transition-transform flex items-center justify-center"
        >
          <svg 
            viewBox="0 0 34 30" 
            fill="currentColor" 
            className="w-full h-full"
          >
            
            <path d="M28.2,11c0.4-0.1,0.8-0.5,0.8-1V1c0-0.3-0.1-0.6-0.4-0.8S28.1,0,27.8,0C20.1,2,11.9,2,4.2,0C3.9,0,3.6,0,3.4,0.2  C3.1,0.4,3,0.7,3,1v9c0,0.5,0.3,0.9,0.8,1c0.4,0.1,0.8,0.2,1.2,0.3v4c-0.3-0.1-0.5-0.1-0.8-0.2c-0.3-0.1-0.6,0-0.9,0.2  C3.1,15.4,3,15.7,3,16v3c0,0.1,0,0.1,0,0.2c0,0,0,0.1,0,0.1c0,0.1,0.1,0.2,0.2,0.3c0,0,0,0,0.1,0.1c0.1,0.1,0.1,0.1,0.2,0.2  c0,0,0,0,0,0l10.3,5.4l-9.3,4.9C4,30.4,3.9,31,4.1,31.5C4.3,31.8,4.6,32,5,32c0.2,0,0.3,0,0.5-0.1L16,26.4l10.5,5.5  C26.7,32,26.8,32,27,32c0.4,0,0.7-0.2,0.9-0.5c0.3-0.5,0.1-1.1-0.4-1.3l-9.3-4.9l10.3-5.4c0,0,0,0,0,0c0.1,0,0.2-0.1,0.2-0.2  c0,0,0,0,0.1-0.1c0.1-0.1,0.1-0.2,0.2-0.3c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.2v-3c0-0.3-0.1-0.6-0.4-0.8C28.4,15,28.1,15,27.8,15  c-0.3,0.1-0.5,0.1-0.8,0.2v-4C27.4,11.1,27.8,11.1,28.2,11z M10.3,21.1c1.9,0.2,3.8,0.3,5.7,0.3s3.8-0.1,5.7-0.3l-5.7,3L10.3,21.1z   M25,15.6c-5.9,1.1-12.1,1.1-18,0v-4c3,0.5,6,0.8,9,0.8s6-0.3,9-0.8V15.6z"/>
          </svg>
        </Link>
      </div>

      <div className="w-full max-w-7xl border-[5px] border-fb-dark bg-fb-cream/50 mb-5 flex flex-col items-center p-0">
        
        <h2 className="font-limelight bg-fb-dark text-fb-cream text-lg md:text-2xl py-2 uppercase tracking-wider text-center w-full">
          Règles du jeu
        </h2>
        
        <div className="space-y-3 text-sm md:text-base w-full text-left font-medium tracking-wide leading-relaxed p-4 md:p-5 text-fb-dark">
          <div>
            <h3 className="font-extrabold uppercase tracking-wider block mb-0.5">Mode Répétition Générale</h3>
            <p>Placez les 30 cartes dans l'ordre selon le paramètre choisi. Vous pouvez réessayer de placer la carte autant de fois que nécessaire.</p>
          </div>
          
          <div>
            <h3 className="font-extrabold uppercase tracking-wider block mb-0.5">Mode Prise N°1</h3>
            <p>Placez les 30 cartes dans l'ordre selon le paramètre choisi. Vous pouvez réessayer de placer la carte 2 fois. Une carte bien placée vous rapporte 1 point, une carte non placée est défaussée et une nouvelle carte est ajoutée à la pile.</p>
          </div>
          
          <div>
            <h3 className="font-extrabold uppercase tracking-wider block mb-0.5">Mode Plan-Séquence</h3>
            <p>Placez les cartes dans l'ordre selon le paramètre choisi, il n'y a pas de nombre limite de cartes. Vous n'avez qu'une seule chance pour placer la carte. Une carte bien placée vous rapporte 10 points, chaque nouvelle carte bien placée multiplie les points gagnés précédemment par 1,2. Dès qu'une carte est mal placée, le jeu se termine.</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-4 mb-4">
        
        <Link 
          to="/Game-Type" 
          state={{ difficulte: 'facile' }} 
          className="flex-1 border-[5px] border-fb-dark bg-fb-red p-4 text-center shadow-md transition-all hover:brightness-110 active:scale-[0.99] flex flex-col justify-center items-center group min-h-25 md:min-h-37.5"
        >
          <span className="font-limelight text-fb-cream text-3xl md:text-5xl tracking-wide transition-transform group-hover:scale-105">
            JOUER
          </span>
          <span className="font-limelight text-fb-cream text-base md:text-lg uppercase mt-1 leading-tight">
            Répétition<br />Générale
          </span>
        </Link>

        <Link 
          to="/Game-Type" 
          state={{ difficulte: 'normale' }} 
          className="flex-1 border-[5px] border-fb-dark bg-fb-red p-4 text-center shadow-md transition-all hover:brightness-110 active:scale-[0.99] flex flex-col justify-center items-center group min-h-25 md:min-h-37.5"
        >
          <span className="font-limelight text-fb-cream text-3xl md:text-5xl tracking-wide transition-transform group-hover:scale-105">
            JOUER
          </span>
          <span className="font-limelight text-fb-cream text-base md:text-lg uppercase mt-3">
            Prise N°1
          </span>
        </Link>

        <Link 
          to="/Game-Type" 
          state={{ difficulte: 'difficile' }} 
          className="flex-1 border-[5px] border-fb-dark bg-fb-red p-4 text-center shadow-md transition-all hover:brightness-110 active:scale-[0.99] flex flex-col justify-center items-center group min-h-25 md:min-h-37.5"
        >
          <span className="font-limelight text-fb-cream text-3xl md:text-5xl tracking-wide transition-transform group-hover:scale-105">
            JOUER
          </span>
          <span className="font-limelight text-fb-cream text-base md:text-lg uppercase mt-1 leading-tight">
            Plan-<br />Séquence
          </span>
        </Link>
        
      </div>
    </section>
  );
}

export default Home;