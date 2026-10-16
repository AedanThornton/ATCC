import { createContext, useContext, useEffect, useState } from "react";
import { useCollectionsContext } from "../../editor/collections/hooks/CollectionsContext";

const SavedSetsContext = createContext();

export function SavedSetsProvider({ children }) {
  const { activeView } = useCollectionsContext();
  
  const [savedSetsOpen, setSavedSetsOpen] = useState(false);
  const [activeSetName, setActiveSetName] = useState("Collections")
  const [currentSetType, setCurrentSetType] = useState("Sets")
  const setTypes = ["Sets", "Loadouts"]
  // const setTypes = ["Sets", "Decks", "Loadouts"]

  useEffect(() => {
    const viewMap = {
      "Collections": "Sets",
      "Deck": "Sets",
      "LoadoutBuilder": "Loadouts",
      "Compare": "Sets",
    }

    setCurrentSetType(viewMap[activeView] || "Sets")
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