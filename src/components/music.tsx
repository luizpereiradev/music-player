import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { IGlobalContext, ITrack } from "../types";
import { GlobalContext } from "../GlobalContext";
import { useContext } from "react";
import { IconContext } from "react-icons";
import Heart from "./Heart";

function Music({
  music,
  index,
  fav,
}: {
  music: ITrack;
  index: number;
  fav?: boolean;
}) {
  const {
    playngState: [isPlaying, setIsPlaying],
    setAtualAlbum,
    setTrackNumber,
    soundOptions,
    track,
  } = useContext(GlobalContext) as IGlobalContext;

  const [play, { pause }] = soundOptions;
  return (
    <div className="hover:bg-[#44475a] p-2 rounded-lg flex items-center justify-between group-one  ">
      <div className="flex gap-3">
        <div className="w-10 group h-13 rounded-lg flex justify-center items-center">
          <p
            className={`${
              music.trackName === track.trackName ? "hidden" : "block"
            }  group-one-hover:hidden`}
          >
            {index + 1}
          </p>
          <div
            className={`${
              music.trackName === track.trackName ? "flex" : "hidden"
            } group-one-hover:flex items-center justify-center`}
          >
            {!isPlaying || music.trackName !== track.trackName ? (
              <button
                onMouseDown={() => {
                  console.log(music !== track)
                  if (fav) {
                    setAtualAlbum(1);
                  } else {
                    setAtualAlbum(music.collectionId);
                  }
                  setTrackNumber(index + 1);
                  pause();
                }}
                onClick={() => {
                  setTimeout(() => {
                    setIsPlaying(true);
                  }, 1000);
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
        <div className="invisible group-one-hover:visible">
          <Heart music={music} />
        </div>
        <p>0:29</p>
      </div>
    </div>
  );
}

export default Music;
