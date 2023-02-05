import { useState } from "react";
import { IconContext } from "react-icons";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiOutlineSearch,
} from "react-icons/ai";
function Search() {
  const [isPlaying, setIsPlaying] = useState(false);

  const playingButton = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="h-[calc(100vh-6rem)] w-full bg-[#30313d] min-w-[300px]">
      <div className="relative p-4">
        <AiOutlineSearch size={22} className="absolute left-5 top-6" />
        <input
          type="text"
          className="max-w-sm w-full focus:outline-0 focus:outline-none p-2 pl-7 rounded-lg"
          placeholder="What do you want to listen to?"
        />
      </div>
      <div className="flex text-gray-300">
        <div className="flex flex-col gap-2 bg-[#44475a] p-3 rounded-lg">
          <div className="relative group">
            <img
              src="https://pbs.twimg.com/media/EXwlRDnWkAUV2mB.jpg"
              className="w-40 h-40 rounded-lg group-hover:opacity-70 transition-all"
              alt="album"
            />
            <div className="opacity-0 duration-500 group-hover:-translate-y-5  transition-all  group-hover:opacity-100  absolute top-20 left-[60px]">
              {!isPlaying ? (
                <button onClick={playingButton}>
                  <IconContext.Provider
                    value={{ size: "3em", color: "#FCFCFC" }}
                  >
                    <AiFillPlayCircle />
                  </IconContext.Provider>
                </button>
              ) : (
                <button onClick={playingButton}>
                  <IconContext.Provider
                    value={{ size: "3em", color: "#FCFCFC" }}
                  >
                    <AiFillPauseCircle />
                  </IconContext.Provider>
                </button>
              )}
            </div>
          </div>
          <h3 className="text-white font-semibold">Gado</h3>
          <p>2022 - Froid</p>
        </div>
      </div>
    </div>
  );
}

export default Search;
