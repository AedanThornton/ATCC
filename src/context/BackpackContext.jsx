import { createContext, useContext, useState } from "react";
import BackpackCardList from "../components/backpack/BackpackCardList"
import Deck from "../components/deck/Deck"
import Compare from "../components/compare/Compare"

const BackpackContext = createContext();

export function BackpackProvider({ children }) {
  const [activeView, setActiveView] = useState("Backpack");

  const views = {
    "Backpack": <BackpackCardList />,
    "EditDeck": <Deck />,
    "Compare": <Compare />,
    // "LoadoutBuilder": <div style={{height: "1000px"}}>LoadoutBuilder</div>,
    // "Simulator": <div style={{height: "1000px"}}>Simulator</div>,
  } || {};

  return (
    <BackpackContext.Provider value={{ views, activeView, setActiveView }}>
      {children}
    </BackpackContext.Provider>
  );
}

export const useBackpackContext = () => useContext(BackpackContext);