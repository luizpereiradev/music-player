import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { IGlobalContext, ITrack } from "../types";
import { GlobalContext } from "../GlobalContext";
import { useContext } from "react";
import { IconContext } from "react-icons";
import { BiPause } from "react-icons/bi";

function Music({ music }: { music: ITrack }) {
  const {
    playngState: [isPlaying, setIsPlaying],
    setAtualAlbum,
    atualAlbum,
    setTrackNumber,
    number,
    soundOptions,
  } = useContext(GlobalContext) as IGlobalContext;

  const [play, { pause }] = soundOptions;
  return (
    <div className="hover:bg-[#44475a] p-2 rounded-lg flex items-center justify-between group  ">
      <div className="flex gap-3">
        <div className="w-10 group h-13 rounded-lg flex justify-center items-center">
          <p className={`${music.trackNumber === number && music.collectionId === atualAlbum ? 'hidden': 'block'}  group-hover:hidden`}>{music.trackNumber}</p>
          <div className={`${music.trackNumber === number && music.collectionId === atualAlbum ? 'flex': 'hidden'} group-hover:flex items-center justify-center`}>
            {!isPlaying ||  music.trackNumber !== number || music.collectionId !== atualAlbum ? (
              <button
                onMouseDown={() => {
                  setAtualAlbum(music.collectionId);
                  setTrackNumber(music.trackNumber);
                  pause();
                }}
                onClick={() => {
                  setIsPlaying(true);
                }}
              >
                <IconContext.Provider value={{ size: "2em", color: "#FCFCFC" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsPlaying(false);
                }}
              >
                <IconContext.Provider value={{ size: "2em", color: "#FCFCFC" }}>
                  <AiFillPauseCircle />
                </IconContext.Provider>
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold">{music.trackName}</h1>
          <p>{music.artistName}</p>
        </div>
      </div>
      <div className="flex gap-10">
        <AiOutlineHeart
          className="ml-4 invisible group-hover:visible"
          size={23}
        />
        <p>0:29</p>
      </div>
    </div>
  );
}

export default Music;
