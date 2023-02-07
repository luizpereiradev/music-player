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
  const [atualAlbum, setAtualAlbum] = useState('1563510274');
  const [musics, setMusics] = useState([]);
  const [track, setTrack] = useState({
    artistName: "Pineapple StormTv, Froid, BK, Djonga, Salve Malak & Hunter",
    artworkUrl100: "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/44/3e/0d/443e0dad-b295-9c77-30ca-6507275b6166/0.jpg/100x100bb.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPrevie…08-eee5-55ef5626b190/mzaf_2765432857154458962.plus.aac.p.m4a",
    trackName: "Nasci pra Ser Grande (Tributo F.R)",
});
  let soundOptions = useSound(track.previewUrl, { volume: 1 });
  let [play, { pause }] = soundOptions;
  const playngState = useState(false);
  const [isPlaying] = playngState;

  useEffect(() => {
    getMusics(atualAlbum).then((data) => {
      setMusics(data);
      setTrack(data[1]);
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
