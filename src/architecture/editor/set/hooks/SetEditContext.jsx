import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../../../../management/localstorage/LocalStorageContext";

const SetEditContext = createContext();

export function SetEditProvider({ children }) {
  const { addToBackpack, removeFromBackpack, addToActiveSet, removeFromActiveSet } = useLocalStorage()
  const [activeView, setActiveView] = useState("Backpack");
  const [backpackIsActive, setBackpackIsActive] = useState(true)

  async function handleAddToSet(id) {
    if (addToBackpack(id)) return;
    if (backpackIsActive) {
      addToActiveSet(id)
    }
  }

  function handleRemoveFromSet(id) {
    if (backpackIsActive) {
      removeFromBackpack(id)
    }
    removeFromActiveSet(id)
  }

  const values = { 
    activeView, setActiveView,
    backpackIsActive, setBackpackIsActive,
    handleAddToSet, handleRemoveFromSet
  }

  return (
    <SetEditContext.Provider value={values}>
      {children}
    </SetEditContext.Provider>
  );
}

export function useSetEditContext() {
  const context = useContext(SetEditContext);

  if (!context) {
    throw new Error("useSetEditContext must be used within SetEditProvider");
  }

  return context;
}