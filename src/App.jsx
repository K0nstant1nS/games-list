import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./components/list/list";
import GameDetails from "./components/game-details/game-details";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />}></Route>
          <Route path="/game/:id" element={<GameDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
