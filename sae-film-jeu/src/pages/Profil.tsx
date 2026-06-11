import { Link } from 'react-router-dom';

function Profil() {
  const nomJoueur = "Nom du joueur";
  const grade = "Stagiaire";
  const studioId = "FLASH-BACK STUDIO #00684";
  
  const statistiques = {
    chefDoeuvre: 42,
    clapsFin: 163
  };

  const historique = [
    { date: "08/06", mode: "Répétition générale", critere: "Année de production", score: "/" },
    { date: "08/06", mode: "Plan-séquence", critere: "Année de production", score: "12 points" },
    { date: "03/06", mode: "Prise n°1", critere: "Recettes commerciales", score: "26 points" },
    { date: "02/06", mode: "Plan-séquence", critere: "La première", score: "3 points" },
    { date: "02/06", mode: "Répétition générale", critere: "Métrage", score: "/" },
    { date: "02/06", mode: "Prise n°1", critere: "La première", score: "14 points" },
  ].slice(0, 6);

  return (
    <section className="flex flex-col items-center bg-fb-cream min-h-screen p-3 md:p-6 text-fb-dark font-rokkitt">
      
      <div className="w-full max-w-7xl flex items-center justify-between mt-2 mb-4">
        <Link 
          to="/" 
          className="w-10 h-10 text-fb-dark hover:scale-105 transition-transform flex items-center justify-center bg-transparent border-none cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </Link>

        <div className="flex-1 pl-4 md:pl-6 text-left">
          <h2 className="font-limelight uppercase text-fb-red text-2xl md:text-3xl tracking-wide">
            Fiche de carrière
          </h2>
          <p className="text-base md:text-xl font-bold mt-0.5">{nomJoueur}</p>
        </div>

        <h1 className="font-limelight uppercase text-fb-red text-3xl md:text-5xl tracking-wide">
          Flash-Back
        </h1>
      </div>

      <div className="w-full max-w-7xl border-[5px] border-fb-dark bg-fb-red py-1 md:py-2 mb-3 text-center">
        <h2 className="font-limelight uppercase text-fb-cream text-4xl md:text-7xl tracking-widest leading-none">
          {grade}
        </h2>
      </div>

      <div className="w-full max-w-7xl font-limelight text-xl md:text-2xl italic tracking-wide text-left mb-4">
        {studioId}
      </div>

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 items-stretch">
        
        <div className="flex-1 border-[5px] border-fb-dark bg-fb-cream/50 p-0 flex flex-col">
          <h3 className="font-limelight bg-fb-dark text-fb-cream text-center text-lg md:text-2xl py-1.5 uppercase tracking-wider w-full">
            Historique
          </h3>
          <div className="overflow-x-auto w-full p-3 md:p-4 flex-1">
            <table className="w-full text-left border-collapse text-sm md:text-lg font-medium">
              <thead>
                <tr className="border-b-2 border-fb-dark/20 font-extrabold uppercase">
                  <th className="pb-1.5 pr-2">Date</th>
                  <th className="pb-1.5 px-2">Mode</th>
                  <th className="pb-1.5 px-2">Critère</th>
                  <th className="pb-1.5 pl-2 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fb-dark/10">
                {historique.map((row, index) => (
                  <tr key={index} className="hover:bg-fb-dark/5 transition-colors">
                    <td className="py-1.5 pr-2 opacity-90">{row.date}</td>
                    <td className="py-1.5 px-2">{row.mode}</td>
                    <td className="py-1.5 px-2 opacity-80">{row.critere}</td>
                    <td className="py-1.5 pl-2 text-right font-bold">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-6 justify-between">
          
          <div className="border-[5px] border-fb-dark bg-fb-cream/50 p-0 flex flex-col flex-1">
            <h3 className="font-limelight bg-fb-dark text-fb-cream text-center text-base md:text-lg py-1 uppercase tracking-wider w-full">
              Le Chef-d'œuvre
            </h3>
            <div className="flex items-center justify-center p-3 text-center flex-1">
              <span className="font-limelight text-fb-red text-5xl">
                {statistiques.chefDoeuvre} points
              </span>
            </div>
          </div>

          <div className="border-[5px] border-fb-dark bg-fb-cream/50 p-0 flex flex-col flex-1">
            <h3 className="font-limelight bg-fb-dark text-fb-cream text-center text-base md:text-lg py-1 uppercase tracking-wider w-full">
              Claps de fin
            </h3>
            <div className="flex items-center justify-center p-3 text-center flex-1">
              <span className="font-limelight text-fb-red text-5xl">
                {statistiques.clapsFin} tournages
              </span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Profil;