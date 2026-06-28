import { createContext, useContext, useState } from "react";
import BackpackCardList from "../components/backpack/BackpackCardList"
import Deck from "../components/deck/Deck"
import Compare from "../components/compare/Compare"
import { useLocalStorage } from "./LocalStorageContext";

const BackpackContext = createContext();

export function BackpackProvider({ children }) {
  const { addToBackpack, removeFromBackpack } = useLocalStorage()
  const [activeView, setActiveView] = useState("Backpack");
  const [backpackPreviewOpen, setBackpackPreviewOpen] = useState(false);

  async function handleAddToBackpack(id) {
    if (addToBackpack(id)) return;

    setBackpackPreviewOpen(true);
    setTimeout(() => {
      setBackpackPreviewOpen(false);
    }, 600);
  }

  function handleRemoveFromBackpack(id) {
    removeFromBackpack(id)

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