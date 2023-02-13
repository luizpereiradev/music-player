import { AiOutlineSearch } from "react-icons/ai";

import { BiLibrary } from "react-icons/bi";
import { Link } from "react-router-dom";

function Aside() {
  return (
      <div className="font-semibold text-gray-300 flex min-w-[150px] max-w-[200px] w-4/12 bg-[#282a36]">
        <div className="fixed">
          <h1 className="p-4 text-xl font-bold">Trybefy</h1>
          <Link to={"/"}>
            <div className="flex items-center p-4 gap-2">
              <AiOutlineSearch size={22} /> <p>Search</p>
            </div>
          </Link>
          <Link to={"/library"}>
            <div className="flex items-center p-4 gap-2">
              <BiLibrary size={22} /> <p>My Library</p>
            </div>
          </Link>
        </div>
      </div>
  );
}

export default Aside;
