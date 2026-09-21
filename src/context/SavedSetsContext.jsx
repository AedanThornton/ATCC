import { createContext, useContext, useEffect, useState } from "react";
import { useBackpackContext } from "./BackpackContext";

const SavedSetsContext = createContext();

export function SavedSetsProvider({ children }) {
  const { activeView } = useBackpackContext();
  
  const [savedSetsOpen, setSavedSetsOpen] = useState(false);
  const [activeSetName, setActiveSetName] = useState("Backpack")
  const [currentSetType, setCurrentSetType] = useState("Sets")
  const setTypes = ["Sets", "Loadouts"]
  // const setTypes = ["Sets", "Decks", "Loadouts"]

  useEffect(() => {
    const viewMap = {
      "Backpack": "Sets",
      "Deck": "Sets",
      "LoadoutBuilder": "Loadouts"
    }

    setCurrentSetType(viewMap[activeView])
  }, [activeView])

  const values = { 
    savedSetsOpen, setSavedSetsOpen,
    activeSetName, setActiveSetName,
    currentSetType, setCurrentSetType,
    setTypes
  }

  useEffect(() => {
    setActiveSetName(null)
  }, [currentSetType])

  return (
    <SavedSetsContext.Provider value={values}>
      {children}
    </SavedSetsContext.Provider>
  );
}

export function useSavedSetsContext() {
  const context = useContext(SavedSetsContext);

  if (!context) {
    throw new Error("useSavedSetsContext must be used within SavedSetsProvider");
  }

  return context;
}