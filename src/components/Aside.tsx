import { Resizable } from "re-resizable";
import { useState } from "react";
import { AiOutlineHome, AiOutlineSearch  } from 'react-icons/ai'

import { BiLibrary } from 'react-icons/bi'

function Aside() {
  const [height] = useState(window.innerHeight - 90);

  return (
    <Resizable
      defaultSize={{
        width: 200,
        height: height,
      }}
      minHeight={height}
      minWidth={100}
      maxWidth={300}
    >
      <div className="h-[calc(100vh-6rem)] w-full font-semibold text-gray-300 bg-[#282a36]">
        <div>
          <h1 className="p-4 text-xl font-bold">Trybefy</h1>
          <div className="flex items-center p-4 gap-2 ">
            <AiOutlineHome size={23}/>  <p className="" >Home</p>
          </div>
          <div className="flex items-center p-4 gap-2">
            <AiOutlineSearch size={22} />  <p >Search</p>
          </div>
          <div className="flex items-center p-4 gap-2">
            <BiLibrary size={22} />  <p >My Library</p>
          </div>
        </div>
      </div>
    </Resizable>
  );
}

export default Aside;
