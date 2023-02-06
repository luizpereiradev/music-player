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
  const [atualAlbum, setAtualAlbum] = useState(1563510274);
  const [musics, setMusics] = useState([]);
  const [track, setTrack] = useState(
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/63/e5/43/63e543e3-20e7-c337-f42c-58983a5e4dec/mzaf_580404497919740347.plus.aac.p.m4a"
  );
  let soundOptions = useSound(track, { volume: 1 });
  let [play, { pause }] = soundOptions;
  const playngState = useState(false);
  const [isPlaying] = playngState;

  useEffect(() => {
    getMusics(atualAlbum).then((data) => {
      setMusics(data);
      setTrack(data[1].previewUrl);
    });
  }, [atualAlbum]);

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
  };

  return (
    <GlobalContext.Provider value={props}>{children}</GlobalContext.Provider>
  );
};
