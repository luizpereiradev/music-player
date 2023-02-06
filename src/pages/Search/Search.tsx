import { useState } from "react";
import { IAlbum } from "../../types";
import { AiOutlineSearch } from "react-icons/ai";
import searchAlbumsAPI from "../../services/searchAlbumsAPI";
import AlbumCard from "./AlbumCard";

function Search() {
  const [searchResults, setSearchResults] = useState<IAlbum[]>([]);

  return (
    <div className="w-full min-w-[600px] bg-[#30313d]">
      <div className="bg-[#282a36] fixed w-full z-40">
        <div className="relative p-4 min-w-[300px]">
          <AiOutlineSearch size={22} className="absolute left-5 top-6" />
          <input
            type="text"
            className="max-w-sm w-full focus:outline-0 focus:outline-none p-2 pl-7 rounded-lg"
            placeholder="What do you want to listen to?"
            onChange={async (e) => {
              setSearchResults(await searchAlbumsAPI(e.target.value));
            }}
          />
        </div>
      </div>
      <div className="pt-36  pb-40 grid h-full gap-4 w-11/12 mx-auto grid-auto-fit">
        {searchResults.map((album) => (
          <AlbumCard key={album.artworkUrl100} album={album} />
        ))}
      </div>
    </div>
  );
}

export default Search;
