import { useEffect, useState } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import { AiOutlineHeart } from "react-icons/ai";
import { GoMute, GoUnmute } from "react-icons/go";

export default function Player() {
  const TRACK =
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/63/e5/43/63e543e3-20e7-c337-f42c-58983a5e4dec/mzaf_580404497919740347.plus.aac.p.m4a";

  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(1);

  const [time, setTime] = useState({
    min: 0,
    sec: 0,
  });

  const [currTime, setCurrTime] = useState({
    min: 0,
    sec: 0,
  });

  const [seconds, setSeconds] = useState();

  const [play, { pause, duration, sound }] = useSound(TRACK, { volume: 1 });

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className=" fixed bottom-0 flex bg-[#44475a] text-gray-200 w-screen justify-between">
        <div className="flex items-center p-4 gap-4 h-full">
          <img
            src="https://pbs.twimg.com/media/EXwlRDnWkAUV2mB.jpg"
            className="w-16 h-16 rounded-lg"
            alt="album"
          />
          <div className="text-sm flex flex-col h-full">
            <p>Clareou</p>
            <p className="text-xs text-gray-300">Froid, Léo Casa 1</p>
          </div>
          <AiOutlineHeart className="ml-4" size={20} />
        </div>
        <div className="relative flex w-1/2 flex-col h-24 justify-end items-center">
          <div className="absolute top-4 flex">
            <button>
              <IconContext.Provider value={{ size: "2.4em", color: "#FFFFFF" }}>
                <BiSkipPrevious />
              </IconContext.Provider>
            </button>
            {!isPlaying ? (
              <button onClick={playingButton}>
                <IconContext.Provider value={{ size: "3em", color: "#FCFCFC" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </button>
            ) : (
              <button onClick={playingButton}>
                <IconContext.Provider value={{ size: "3em", color: "#FCFCFC" }}>
                  <AiFillPauseCircle />
                </IconContext.Provider>
              </button>
            )}
            <button>
              <IconContext.Provider value={{ size: "2.4em", color: "#FFFFFF" }}>
                <BiSkipNext />
              </IconContext.Provider>
            </button>
          </div>
          <div className="w-full">
            <div className="flex justify-between px-2">
              <p>
                {currTime.min}:{currTime.sec}
              </p>
              <p>
                {time.min}:{time.sec}
              </p>
            </div>
            <input
              type="range"
              min="0"
              {...(duration && { max: duration / 1000 })}
              value={seconds}
              className="w-full"
              onChange={(e) => {
                sound.seek([e.target.value]);
              }}
            />
          </div>
        </div>
        <div className="h-24 px-4 flex items-center">
          <div className="flex gap-3 h-10 items-center">
            {volume > 0 ? (
              <GoUnmute
                size={20}
                onClick={() => {
                  setVolume(0);
                  sound.volume(0);
                }}
              />
            ) : (
              <GoMute
                size={20}
                onClick={() => {
                  setVolume(1);
                  sound.volume(1);
                }}
              />
            )}
            <input
            className="w-20"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => {
                setVolume(+e.target.value);
                sound.volume(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
