import { createContext, ReactNode, useEffect, useState } from "react";
import useSound from "use-sound";
import { IGlobalContext } from "./types";

export const GlobalContext = createContext({});

type GlobalContextProviderProps = {
  children: ReactNode;
};

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const TRACK =
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/63/e5/43/63e543e3-20e7-c337-f42c-58983a5e4dec/mzaf_580404497919740347.plus.aac.p.m4a";

  const playngState = useState(false);

  const soundOptions =  useSound(TRACK, { volume: 1 });

  const [play, { pause }] = soundOptions

  useEffect(() => {
    if (playngState[0]) {
      play();
    } else {
      pause();
    }
  }, [playngState]);

  const props : IGlobalContext  = {playngState, TRACK, soundOptions}

  return <GlobalContext.Provider value={props}>{children}</GlobalContext.Provider>;
};
