import { useEffect, useState } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import { AiOutlineHeart } from "react-icons/ai";

export default function Player() {
  const TRACK =
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/63/e5/43/63e543e3-20e7-c337-f42c-58983a5e4dec/mzaf_580404497919740347.plus.aac.p.m4a";

  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    min: 0,
    sec: 0,
  });
  const [currTime, setCurrTime] = useState({
    min: 0,
    sec: 0,
  });

  const [seconds, setSeconds] = useState();

  const [play, { pause, duration, sound }] = useSound(TRACK);

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
    <div className="w-screen h-screen flex items-end">
      <div className="flex bg-slate-500 w-screen">
        <div className="flex items-center p-4 gap-4 h-full">
          <img
            src="https://pbs.twimg.com/media/EXwlRDnWkAUV2mB.jpg"
            className="w-16 h-16"
            alt="album"
          />
          <div className="text-sm flex flex-col h-full">
            <p>Clareou</p>
            <p className="text-xs">Froid, Léo Casa 1</p>
          </div>
          <AiOutlineHeart className="ml-4" size={20} />
        </div>
        <div className="relative flex w-1/2 flex-col h-24 justify-end items-center">
          <div className="absolute top-4">
            <button>
              <IconContext.Provider value={{ size: "2em", color: "#27AE60" }}>
                <BiSkipPrevious />
              </IconContext.Provider>
            </button>
            {!isPlaying ? (
              <button onClick={playingButton}>
                <IconContext.Provider
                  value={{ size: "2.5em", color: "#27AE60" }}
                >
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </button>
            ) : (
              <button onClick={playingButton}>
                <IconContext.Provider
                  value={{ size: "2.5em", color: "#27AE60" }}
                >
                  <AiFillPauseCircle />
                </IconContext.Provider>
              </button>
            )}
            <button>
              <IconContext.Provider value={{ size: "2em", color: "#27AE60" }}>
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
              max={duration / 1000}
              value={seconds}
              className="w-full"
              onChange={(e) => {
                sound.seek([e.target.value]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
