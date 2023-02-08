import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IGlobalContext, ITrack } from "../types";
import { GlobalContext } from "../GlobalContext";
import { useContext } from "react";

function Heart({ music }: { music: ITrack}) {
  const {
    setMyLibrary,
    myLibrary,
  } = useContext(GlobalContext) as IGlobalContext;
  return (
    <div  className="group" onClick={() => {
      if(
        myLibrary.find(
          (track) => music.previewUrl === track.previewUrl
        )
      ) {
        setMyLibrary(myLibrary.filter(track => music.previewUrl !== track.previewUrl))
        return;
      }
      setMyLibrary([...myLibrary, music])
    }}>
      {myLibrary.find((track) => music.previewUrl === track.previewUrl) ? (
          <AiFillHeart
            className="ml-4 block text-red-500 hover:scale-110 hover:transition-all"
            size={20}
          />
        ) : (
          <>
            <AiOutlineHeart className="ml-4 group-hover:hidden" size={20} />
            <AiFillHeart
              className="ml-4 hidden group-hover:block group-hover:scale-110 group-hover:transition-all text-red-500"
              size={20}
            />
          </>
        )}
    </div>
  );
}

export default Heart;