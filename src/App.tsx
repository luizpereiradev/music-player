import Aside from "./components/Aside";
import Player from "./components/Player";
import Search from "./pages/Search/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Library from "./pages/Library";
import Album from "./pages/Album";
function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#282a36]">
        <Aside />
        <Player />
        <Routes>
          <Route element={<Search />} path="/" />
          <Route element={<Library />} path="/library" />
          <Route element={<Album />} path="/album/:id" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
