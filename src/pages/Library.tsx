import { IconContext } from "react-icons";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { GlobalContext } from "../GlobalContext";
import { useContext } from "react";
import { IGlobalContext, ITrack } from "../types";
import Music from "../components/music";

function Library() {
  const {
    myLibrary,
  } = useContext(GlobalContext) as IGlobalContext;
  return (
    <div className="w-full text-gray-200 bg-[#30313d]">
        <h1 className="p-10 font-bold text-3xl">My library</h1>
        <div className="flex flex-col gap-2 p-8">
          {myLibrary.map((music: ITrack, index) => (
            <Music key={music.trackName} music={music} index={index} fav />
          ))}
        </div>
    </div>
  );
}

export default Library;
