import { createContext, ReactNode, useEffect, useState } from "react";
import useSound from "use-sound";
import getMusics from "./services/getMusics";
import { IGlobalContext } from "./types";

export const GlobalContext = createContext({});

type GlobalContextProviderProps = {
  children: ReactNode;
};

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [atualAlbum, setAtualAlbum] = useState(1639584448);
  const [track, setTrack] = useState({
    artworkUrl100:"https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/38/86/76/388676f7-c292-83b4-262d-62e5cb3acecc/0.jpg/100x100bb.jpg",
    artistName: "Froid & Leo Casa 1",
    trackName: "Clareou",
    trackNumber: 1,
    collectionName: 'Froid & Leo Casa 1',
    collectionId: 1639584448,
    previewUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/57/4e/2f/574e2fb6-3e05-489c-d1bd-5c14d58853a0/mzaf_5336952176452453215.plus.aac.p.m4a`
  }
  );
  const [musics, setMusics] = useState([]);
  let soundOptions = useSound(track?.previewUrl, { volume: 1 });
  let [play, { pause }] = soundOptions;
  const playngState = useState(false);
  const [isPlaying] = playngState;
  const [number ,setTrackNumber] = useState(1);

  useEffect(() => {
    console.log(number);
    getMusics(atualAlbum).then((data) => {
      setMusics(data);
      setTrack(data[number]);
    });
  }, [atualAlbum, number]);

  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
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
  };

  return (
    <GlobalContext.Provider value={props}>{children}</GlobalContext.Provider>
  );
};
