import React from "react";
import { ReturnedValue } from "use-sound/dist/types";

export interface IGlobalContext {
  playngState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  TRACK: string,
  soundOptions: ReturnedValue,
}