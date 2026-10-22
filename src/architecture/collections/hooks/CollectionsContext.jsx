import { createContext, useContext, useEffect, useState } from "react";
import { useSetEditContext } from "../../editor/set/hooks/SetEditContext";

const CollectionsContext = createContext();

export function CollectionsProvider({ children }) {
  const { activeView } = useSetEditContext();
  
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [activeSetName, setActiveSetName] = useState("Workspace")
  const [currentSetType, setCurrentSetType] = useState("Sets")
  const setTypes = ["Sets", "Loadouts"]
  // const setTypes = ["Sets", "Decks", "Loadouts"]

  useEffect(() => {
    const viewMap = {
      "Workspace": "Sets",
      "Deck": "Sets",
      "LoadoutBuilder": "Loadouts",
      "Compare": "Sets",
    }

    setCurrentSetType(viewMap[activeView] || "Sets")
  }, [activeView])

  const values = { 
    collectionsOpen, setCollectionsOpen,
    activeSetName, setActiveSetName,
    currentSetType, setCurrentSetType,
    setTypes
  }

  useEffect(() => {
    setActiveSetName(null)
  }, [currentSetType])

  return (
    <CollectionsContext.Provider value={values}>
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollectionsContext() {
  const context = useContext(CollectionsContext);

  if (!context) {
    throw new Error("useCollectionsContext must be used within CollectionsProvider");
  }

  return context;
}