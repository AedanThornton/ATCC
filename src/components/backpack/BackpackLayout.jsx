import { useState } from "react";
import HamburgerButton from "../utils/HamburgerButton";
import SavedSets from "../savedsets/SavedSets";
import { useBackpackContext } from "../../context/BackpackContext";
import getIcon from "../utils/iconUtils";

const BackpackTabSelector = () => {
  const { activeView, setActiveView } = useBackpackContext()

  const views = [
    "Backpack",
    "Deck",
    "LoadoutBuilder",
    // "Compare": Compare,
    // "Simulator": <div style={{height: "1000px"}}>Simulator</div>,
  ];

  return <div className="backpack-tab-selector">
    {views.length > 0 && views.map((view, i) => (
      <button
        key={i}
        onClick={() => setActiveView(view)}
        disabled={activeView === view}
      >
        {getIcon({ name: view, invert: true })}</button>
    ))}
  </div>
}

export const BackpackLayoutTopbar = () => {

  return <>
    <BackpackTabSelector />

    <div className="top-menu">

    </div>
  </>
}