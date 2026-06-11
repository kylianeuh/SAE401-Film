import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameType from './pages/GameType';
import Game from './pages/Game';
import Profil from './pages/Profil';

function App() {
  return (
    <Router>
      {/* 1. Conteneur principal qui applique la couleur de fond sur tout le site */}
      <div className="relative min-h-screen w-full bg-fb-cream">
        
        {/* 2. La texture globale superposée, invisible pour PostCSS mais active partout */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none z-50 bg-repeat" 
          style={{ backgroundImage: "url('/src/assets/texture.png')" }}
        />
        
        {/* 3. Tes routes restent inchangées et s'affichent au-dessus du fond */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game-type" element={<GameType />} />
            <Route path="/game" element={<Game />} />
            <Route path="/profil" element={<Profil />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;