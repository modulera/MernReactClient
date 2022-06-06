import React, { useReducer } from "react";
import { MediaReducer, initialState } from './reducer';

const MediaStateContext = React.createContext();
const MediaDispatchContext = React.createContext();

export function useMediaState() {
  const context = React.useContext(MediaStateContext);
  if (context === undefined) {
    throw new Error("useMediaState must be used within a MediaProvider");
  }

  return context;
}

export function useMediaDispatch() {
  const context = React.useContext(MediaDispatchContext);
  if (context === undefined) {
    throw new Error("useMediaDispatch must be used within a MediaProvider");
  }

  return context;
}

export const MediaProvider = ({ children }) => {
  const [files, dispatch] = useReducer(MediaReducer, initialState);

  return (
    <MediaStateContext.Provider value={files}>
      <MediaDispatchContext.Provider value={dispatch}>
        {children}
      </MediaDispatchContext.Provider>
    </MediaStateContext.Provider>
  );
}