import React from "react";
import { ReturnedValue } from "use-sound/dist/types";

export interface IGlobalContext {
  playngState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  soundOptions: ReturnedValue,
  setAtualAlbum: React.Dispatch<React.SetStateAction<number>>,
  setTrack: React.Dispatch<React.SetStateAction<string>>,
  musics: {previewUrl: string}[],
  track: string,
}

export interface IAlbum {
    artistId: number;
    artistName: string;
    collectionId: number;
    collectionName: string;
    collectionPrice: number;
    artworkUrl100: string;
    releaseDate: string;
    trackCount: number;
  }