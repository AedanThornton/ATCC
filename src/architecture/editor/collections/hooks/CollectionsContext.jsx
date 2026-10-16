import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../../../../management/localstorage/LocalStorageContext";

const CollectionsContext = createContext();

export function CollectionsProvider({ children }) {
  const { appState, addToBackpack, removeFromBackpack, addToActiveSet, removeFromActiveSet } = useLocalStorage()
  const [activeView, setActiveView] = useState("Backpack");
  const [backpackIsActive, setBackpackIsActive] = useState(true)
  const [collectionsPreviewOpen, setCollectionsPreviewOpen] = useState(false);

  async function handleAddToCollections(id) {
    if (addToBackpack(id)) return;
    if (backpackIsActive) {
      addToActiveSet(id)
    }

    setCollectionsPreviewOpen(true);
    setTimeout(() => {
      setCollectionsPreviewOpen(false);
    }, 600);
  }

  function handleRemoveFromCollections(id) {
    if (backpackIsActive) {
      removeFromBackpack(id)
    }
    removeFromActiveSet(id)
    
    setCollectionsPreviewOpen(true);
    setTimeout(() => {
      setCollectionsPreviewOpen(false);
    }, 600);
  }

  const values = { 
    activeView, setActiveView,
    backpackIsActive, setBackpackIsActive,
    collectionsPreviewOpen, setCollectionsPreviewOpen,
    handleAddToCollections, handleRemoveFromCollections
  }

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