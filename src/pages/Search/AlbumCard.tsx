import { IconContext } from "react-icons";
import { useContext } from "react";
import { IGlobalContext } from "../../types";
import { GlobalContext } from "../../GlobalContext";
import { IAlbum } from "../../types";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


function AlbumCard({ album }: { album: IAlbum}) {
  const navigate = useNavigate();
  const {
    playngState: [isPlaying, setIsPlaying],
    setAtualAlbum,
  } = useContext(GlobalContext) as IGlobalContext;
  return (
    <div className="flex w-[210px] text-gray-300 overflow-hidden" onClick={() => navigate(`/album/${album.collectionId}`)}>
      <div className="w-[210px] h-[301px] flex flex-col gap-2 bg-[#44475a] p-3 rounded-lg">
        <div className="relative group mx-auto">
          <img
            src={album.artworkUrl100}
            className="h-44 w-44 rounded-lg group-hover:opacity-70 transition-all"
            alt="album"
          />

          <div className="opacity-0 duration-500 group-hover:-translate-y-5  transition-all  group-hover:opacity-100  absolute top-20 left-[60px]">
            {!isPlaying ? (
              <button
              onMouseDown={(e) => {
                e.stopPropagation();
                setAtualAlbum(album.collectionId);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(true);
                }}>
                <IconContext.Provider value={{ size: "3em", color: "#FCFCFC" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </button>
            ) : (
              <button onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(false);
                }}>
                <IconContext.Provider value={{ size: "3em", color: "#FCFCFC" }}>
                  <AiFillPauseCircle />
                </IconContext.Provider>
              </button>
            )}
          </div>
        </div>
          <h3 className="text-white font-semibold text-ellipsis">
            {album.collectionName}
          </h3>
          <p>
            {album.releaseDate.split("-")[0]} - {album.artistName}
          </p>

      </div>
    </div>
  );
}

export default AlbumCard;
