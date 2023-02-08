import { useEffect, useState } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import { AiOutlineHeart } from "react-icons/ai";
import { GoMute, GoUnmute } from "react-icons/go";
import { GlobalContext } from "../GlobalContext";
import { useContext } from "react";
import { IGlobalContext } from "../types";


export default function Player() {
  const [volume, setVolume] = useState(1);
  const { playngState, soundOptions, setTrack, musics, track, setTrackNumber }  = useContext(GlobalContext) as IGlobalContext;

  const [isPlaying, setIsPlaying] = playngState;
  const [time, setTime] = useState({
    min: 0,
    sec: 0,
  });

  const [currTime, setCurrTime] = useState({
    min: 0,
    sec: 0,
  });

  const [seconds, setSeconds] = useState();

  const [play, { pause, duration, sound }] = soundOptions

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

  const nextMusic = () => {
    if(musics.length === 2) return;
    pause();
    const index = musics.findIndex((music) => music.previewUrl === track.previewUrl);
    if (index === musics.length - 1) {
      setTrackNumber(1);
    }else{
      setTrackNumber((n) => n + 1)
    }
  };

  const prevMusic = () => {
    if(musics.length === 2) return;
    pause();
    const index = musics.findIndex((music) => music.previewUrl === track.previewUrl);
    if (index === 0) {
      setTrack(musics[musics.length - 1]);
    }else{
      setTrack(musics[index - 1]);
    }
  };

  useEffect(() => {
    if (seconds && seconds >= 27 && isPlaying) {
      nextMusic();
    }
    if(!seconds && isPlaying){
      play()
    }
  }, [seconds]);

  if(track) return (
    <>
      <div className="z-10 fixed bottom-0 flex bg-[#44475a] text-gray-200 w-screen justify-between">
        <div className="flex items-center p-4 gap-4 h-full">
          <img
            src={track?.artworkUrl100}
            className="w-16 h-16 rounded-lg"
            alt="album"
          />
          <div className="text-sm flex max-w-[200px] overflow-hidden h-[36px]  flex-col">
            <p>{track?.trackName}</p>
            <p className="text-xs text-gray-300">{track?.artistName}</p>
          </div>
          <AiOutlineHeart className="ml-4" size={20} />
        </div>
        <div className="relative flex w-1/2 flex-col h-24 justify-end items-center">
          <div className="absolute top-4 flex">
            <button onMouseDown={prevMusic} onClick={() => {
                setIsPlaying(true)
              }}>
              <IconContext.Provider value={{ size: "2.4em", color: "#FFFFFF" }}>
                <BiSkipPrevious />
              </IconContext.Provider>
            </button>
            {!isPlaying ? (
              <button onClick={() => {
                setIsPlaying(!isPlaying)
              }}>
                <IconContext.Provider value={{ size: "3em", color: "#FCFCFC" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </button>
            ) : (
              <button onClick={() => {
                setIsPlaying(!isPlaying)
                }}>
                <IconContext.Provider value={{ size: "3em", color: "#FCFCFC" }}>
                  <AiFillPauseCircle />
                </IconContext.Provider>
              </button>
            )}
            <button onMouseDown={nextMusic} onClick={() => {
                setIsPlaying(true)
              }}>
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
  )
  return null;
}
