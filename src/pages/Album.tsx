import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { GlobalContext } from "../GlobalContext";
import { useContext } from "react";
import { IGlobalContext, ITrack } from "../types";
import Music from "../components/music";
import getMusics from "../services/getMusics";
import { useParams } from "react-router-dom";

function Album() {
  const { id } = useParams();
  const [musics, setMusics] = useState([] as ITrack[]);
  useEffect(() => {
    if (id) getMusics(+id).then((musics) => {
      console.log('1')
      setMusics(musics);
    });
  }, []);
  const {
    playngState: [isPlaying, setIsPlaying],
    setAtualAlbum,
  } = useContext(GlobalContext) as IGlobalContext;
  return (
    <div className="w-full text-gray-200 bg-[#30313d]">
      <div className="flex p-10 gap-5 items-end">
        <img
          src={musics[0]?.artworkUrl100}
          alt="album"
          className="w-40 h-40"
        />
        <div>
          <h1 className="font-bold text-3xl">{musics[0]?.collectionName}</h1>
          <p className="pb-6">{musics[0]?.artistName}</p>
          <div>
          {!isPlaying ? (
              <button
              onMouseDown={() => {
                setAtualAlbum(musics[0].collectionId);
              }}
              onClick={() => {
                setIsPlaying(true);
                }}>
                <IconContext.Provider value={{ size: "3em", color: "#FCFCFC" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </button>
            ) : (
              <button onClick={() => {
                setIsPlaying(false);
                }}>
                <IconContext.Provider value={{ size: "3em", color: "#FCFCFC" }}>
                  <AiFillPauseCircle />
                </IconContext.Provider>
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold p-8">Songs</h1>
        <div className="flex flex-col gap-2 p-8">
          {musics.filter((_, i) => i !== 0).map((music : ITrack) => (
            <Music key={music.trackName} music={music} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Album;
