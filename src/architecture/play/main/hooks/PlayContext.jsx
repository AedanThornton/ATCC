import { createContext, useContext, useState } from "react";

const PlayContext = createContext();

export function PlayProvider({ children }) {
  const [activeView, setActiveView] = useState("Deck");

  const values = { 
    activeView, setActiveView,
  }

  return (
    <PlayContext.Provider value={values}>
      {children}
    </PlayContext.Provider>
  );
}

export function usePlayContext() {
  const context = useContext(PlayContext);

  if (!context) {
    throw new Error("usePlayContext must be used within PlayProvider");
  }

  return context;
}