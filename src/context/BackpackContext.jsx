import { createContext, useContext, useState } from "react";
import BackpackCardList from "../components/backpack/BackpackCardList"
import Deck from "../components/deck/Deck"
import Compare from "../components/compare/Compare"
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

  const views = {
    "Backpack": <BackpackCardList />,
    "EditDeck": <Deck />,
    "Compare": <Compare />,
    // "LoadoutBuilder": <div style={{height: "1000px"}}>LoadoutBuilder</div>,
    // "Simulator": <div style={{height: "1000px"}}>Simulator</div>,
  } || {};

  const values = { 
    views, 
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

export const useBackpackContext = () => useContext(BackpackContext);