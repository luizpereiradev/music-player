import Aside from "./components/Aside";
import Player from "./components/Player";
import Search from "./components/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Library from "./components/Library";
import Album from "./components/Album";
function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Aside />
        <Player />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Search />} path="/search" />
          <Route element={<Library />} path="/library" />
          <Route element={<Album />} path="/album/:id" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
