import { Link, useLocation } from 'react-router-dom';
import '../index.css';

type DifficulteKey = 'facile' | 'normale' | 'default';

const menuItems = [
  { type: 'annee', label: 'ANNEE DE PRODUCTION', desc: 'Classez les œuvres selon leur année de sortie en salles.' },
  { type: 'date', label: 'LA PREMIERE', desc: "Soyez précis : triez les films au jour près pour départager les films sortis la même année." },
  { type: 'notes', label: 'APPRECIATION CRITIQUE', desc: "Classez les films selon leur note globale d'appréciation du public." },
  { type: 'duree', label: 'METRAGE', desc: 'Ordonnez les bobines de la plus courte à la plus longue.' },
  { type: 'recette', label: 'RECETTES COMMERCIALES', desc: 'Rangez les films selon les recettes récoltées dans le monde.' },
];

const titleMap: Record<DifficulteKey, string> = {
  facile: 'REPETITION GENERALE',
  normale: 'PRISE N°1',
  default: 'PLAN-SEQUENCE'
};

function GameType() {
  const location = useLocation();
  const difficulte = location.state?.difficulte ?? 'facile';

  const key = (difficulte === 'facile' || difficulte === 'normale' ? difficulte : 'default') as DifficulteKey;
  const currentTitle = titleMap[key];

  return (
    <section className="flex flex-col items-center min-h-screen w-full px-4 pb-12 text-fb-dark font-rokkitt justify-start">
      
      <header className="w-full max-w-7xl flex items-center justify-between mt-4 mb-2">
        <Link 
          to="/"
          className="w-10 h-10 text-fb-dark hover:scale-105 transition-transform flex items-center justify-center cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </Link>
        
        <h1 className="font-limelight uppercase text-fb-red text-3xl md:text-5xl tracking-wide">
          Flash-Back
        </h1>
      </header>

      <div className="w-full max-w-7xl border-3 border-fb-dark p-1 bg-fb-dark mb-8 rounded-sm shadow-md">
        <div className="w-full bg-fb-red border-[3px] border-fb-dark py-4 px-6 text-center">
          <h2 className="font-limelight uppercase text-fb-cream text-3xl sm:text-4xl md:text-6xl tracking-widest leading-none drop-shadow-md">
            {currentTitle}
          </h2>
        </div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
      
        <main className="lg:col-span-2 border-[5px] border-fb-dark bg-fb-cream/20 flex flex-col rounded-sm shadow-sm">
          <h3 className="font-limelight bg-fb-dark text-fb-cream text-left text-lg md:text-xl py-2 px-4 uppercase tracking-wider w-full">
            Quel critère de la fiche technique ?
          </h3>
          
          <ul className="flex flex-col p-3 md:p-4 gap-3 w-full my-auto">
            {menuItems.map((item) => (
              <li key={item.type}>
                <Link 
                  to="/game" 
                  state={{ type: item.type, difficulte: difficulte }}
                  className="block text-left group cursor-pointer transition-all duration-200"
                >
                  <h4 className="font-limelight text-xl md:text-2xl text-fb-dark uppercase tracking-wide group-hover:text-fb-red group-hover:translate-x-1 transition-all">
                    {item.label}
                  </h4>
                  <p className="text-sm md:text-base text-fb-dark/80 font-medium leading-tight mt-0.5">
                    {item.desc}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </main>

        <div className="flex flex-col gap-6">
          
          <div className="border-[5px] border-fb-dark bg-fb-cream/20 flex flex-col rounded-sm shadow-sm flex-1">
            <h3 className="font-limelight bg-fb-dark text-fb-cream text-left text-lg py-1 px-4 uppercase tracking-wider w-full">
              Historique
            </h3>
            <div className="p-4 flex-1">
              <table className="w-full text-left font-bold text-sm md:text-base border-collapse">
                <thead>
                  <tr className="text-fb-dark border-b-2 border-fb-dark/20 uppercase font-limelight tracking-wider text-xs">
                    <th className="pb-1">Date</th>
                    <th className="pb-1 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-fb-dark/10 opacity-90">
                  <tr><td className="py-0.5">08/06</td><td className="py-0.5 text-right">13 cartes</td></tr>
                  <tr><td className="py-0.5">08/06</td><td className="py-0.5 text-right">5 cartes</td></tr>
                  <tr><td className="py-0.5">03/06</td><td className="py-0.5 text-right">17 cartes</td></tr>
                  {key === 'default' && <tr><td className="py-0.5">02/06</td><td className="py-0.5 text-right">21 cartes</td></tr>}
                </tbody>
              </table>
            </div>
          </div>

          {key === 'default' && (
            <div className="border-[5px] border-fb-dark bg-fb-cream/20 flex flex-col rounded-sm shadow-sm flex-1">
              <h3 className="font-limelight bg-fb-dark text-fb-cream text-left text-lg py-1 px-4 uppercase tracking-wider w-full">
                Classement
              </h3>
              <div className="p-4 flex-1">
                <table className="w-full text-left font-bold text-sm md:text-base border-collapse">
                  <thead>
                    <tr className="text-fb-dark border-b-2 border-fb-dark/20 uppercase font-limelight tracking-wider text-xs">
                      <th className="pb-1">Joueur</th>
                      <th className="pb-1 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-fb-dark/10 opacity-90">
                    <tr><td className="py-0.5">Joueur1</td><td className="py-0.5 text-right">42</td></tr>
                    <tr><td className="py-0.5">Joueur1</td><td className="py-0.5 text-right">35</td></tr>
                    <tr><td className="py-0.5">Joueur1</td><td className="py-0.5 text-right">21</td></tr>
                    <tr><td className="py-0.5">Joueur1</td><td className="py-0.5 text-right">19</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default GameType;