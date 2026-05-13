import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameType from './pages/GameType';
import Game from './pages/Game';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game-type" element={<GameType />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;