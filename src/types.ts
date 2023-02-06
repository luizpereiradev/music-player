import React from "react";
import { ReturnedValue } from "use-sound/dist/types";

export interface IGlobalContext {
  playngState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  TRACK: string,
  soundOptions: ReturnedValue,
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