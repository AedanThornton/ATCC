import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "./LocalStorageContext";

const BackpackContext = createContext();

export function BackpackProvider({ children }) {
  const { appState, addToBackpack, removeFromBackpack, addToActiveSet, removeFromActiveSet } = useLocalStorage()
  const [activeView, setActiveView] = useState("Backpack");
  const [backpackIsActive, setBackpackIsActive] = useState(true)
  const [backpackPreviewOpen, setBackpackPreviewOpen] = useState(false);

  async function handleAddToBackpack(id) {
    if (addToBackpack(id)) return;
    if (backpackIsActive) {
      addToActiveSet(id)
    }

    setBackpackPreviewOpen(true);
    setTimeout(() => {
      setBackpackPreviewOpen(false);
    }, 600);
  }

  function handleRemoveFromBackpack(id) {
    if (backpackIsActive) {
      removeFromBackpack(id)
    }
    removeFromActiveSet(id)
    
    setBackpackPreviewOpen(true);
    setTimeout(() => {
      setBackpackPreviewOpen(false);
    }, 600);
  }

  const values = { 
    activeView, setActiveView,
    backpackIsActive, setBackpackIsActive,
    backpackPreviewOpen, setBackpackPreviewOpen,
    handleAddToBackpack, handleRemoveFromBackpack
  }

  return (
    <BackpackContext.Provider value={values}>
      {children}
    </BackpackContext.Provider>
  );
}

export function useBackpackContext() {
  const context = useContext(BackpackContext);

  if (!context) {
    throw new Error("useBackpackContext must be used within BackpackProvider");
  }

  return context;
}