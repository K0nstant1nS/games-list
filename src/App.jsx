import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./components/list/list";
import GamePage from "./pages/game/game";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />}></Route>
          <Route path="/game/:id" element={<GamePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
