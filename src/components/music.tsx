import { AiOutlineHeart } from "react-icons/ai";
import { ITrack } from "../types";
function Music({ music }: { music: ITrack}) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-lg flex justify-center items-center">
          {music.trackNumber}
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
