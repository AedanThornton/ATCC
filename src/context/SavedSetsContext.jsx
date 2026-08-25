import { createContext, useContext, useState } from "react";

const SavedSetsContext = createContext();

export function SavedSetsProvider({ children }) {
  const [activeSetName, setActiveSetName] = useState("Backpack")
  const [currentSetType, setCurrentSetType] = useState("Sets")
  const setTypes = []
  // const setTypes = ["Sets", "Decks", "Loadouts"]

  const values = { 
    activeSetName, setActiveSetName,
    currentSetType, setCurrentSetType,
    setTypes
  }

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