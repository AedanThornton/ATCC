import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../../../../management/localstorage/LocalStorageContext";

const PlayContext = createContext();

export function PlayProvider({ children }) {
  const [activeView, setActiveView] = useState("Deck");
  const { appState } = useLocalStorage();
  const [activeCollectionName, setActiveCollectionName] = useState();

  const values = { 
    activeView, setActiveView,
    activeCollectionName, setActiveCollectionName,
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