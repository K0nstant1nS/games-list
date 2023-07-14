import { Routes, Route, HashRouter } from "react-router-dom";
import List from "./components/list/list";
import GamePage from "./pages/game/game";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<List />}></Route>
          <Route path="/game/:id" element={<GamePage />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
