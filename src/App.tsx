
import Aside from "./components/Aside";
import Player from "./components/Player";
import Test from "./components/Test";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Home from "./components/Home";
import Library from "./components/Library";
import Album from "./components/Album";
function App() {
  return (
  <BrowserRouter>
    <div className="flex">
        <Aside/>
        <Player/>
    <Routes>
      <Route element={<Home/>} path="/"/>
      <Route element={<Test/>} path="/search"/>
      <Route element={<Library/>} path="/library"/>
      <Route element={<Album />} path="/album/:id" />
    </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
