import { createContext, ReactNode, useEffect, useState } from "react";
import useSound from "use-sound";
import getMusics from "./services/getMusics";
import { IGlobalContext, ITrack } from "./types";

export const GlobalContext = createContext({});

type GlobalContextProviderProps = {
  children: ReactNode;
};

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [volume, setVolume] = useState(1);
  const library = localStorage.getItem("myLibrary");
  const [myLibrary, setMyLibrary] = useState<ITrack[]>(
    JSON.parse(library || "[]")
  );
  const [atualAlbum, setAtualAlbum] = useState(434520888);
  const [track, setTrack] = useState({
    artworkUrl100:
      "https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/38/86/76/388676f7-c292-83b4-262d-62e5cb3acecc/0.jpg/100x100bb.jpg",
    artistName: "Froid & Leo Casa 1",
    trackName: "Clareou",
    trackNumber: 1,
    collectionName: "Froid & Leo Casa 1",
    collectionId: 1639584448,
    previewUrl: `https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/dd/d6/fd/ddd6fdd6-095d-bd8b-8c2a-7dcba7335109/mzaf_4592119553780691670.plus.aac.p.m4a`,
  });


  const [musics, setMusics] = useState<ITrack[]>([]);
  let soundOptions = useSound(track?.previewUrl, { volume: volume });
  let [play, { pause }] = soundOptions;
  const playngState = useState(false);
  const [isPlaying] = playngState;
  const [number, setTrackNumber] = useState(1);

  useEffect(() => {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }, [myLibrary]);

  useEffect(() => {
    if (atualAlbum === 1) {
      setMusics(myLibrary);
      setTrack(myLibrary[number - 1]);
      return;
    }
    getMusics(atualAlbum).then((data) => {
      console.log(data[1].previewUrl)
      setMusics(data);
      setTrack(data[number]);
    });
  }, [atualAlbum, number]);

  useEffect(() => {
    if (!isPlaying) {
      pause();
    }
  }, [isPlaying]);

  const props: IGlobalContext = {
    playngState,
    soundOptions,
    setAtualAlbum,
    setTrack,
    track,
    musics,
    setTrackNumber,
    number,
    atualAlbum,
    setMyLibrary,
    myLibrary,
    volume,
    setVolume,
  };

  return (
    <GlobalContext.Provider value={props}>{children}</GlobalContext.Provider>
  );
};
