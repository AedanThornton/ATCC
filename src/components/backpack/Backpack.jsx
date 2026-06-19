import { useDroppable } from "@dnd-kit/react"
import { useState } from "react";
import BackpackCardList from "./BackpackCardList";
import BackpackTabSelector from "./BackpackTabSelector";
import SavedSets from "./SavedSets";
import Deck from "../deck/Deck";
import Compare from "../compare/Compare";
import HamburgerButton from "../utils/HamburgerButton";

const Backpack = ({}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("Backpack");

  const views = {
    "Backpack": <BackpackCardList />,
    "EditDeck": <Deck />,
    "Compare": <Compare />,
    // "LoadoutBuilder": <div style={{height: "1000px"}}>LoadoutBuilder</div>,
    // "Simulator": <div style={{height: "1000px"}}>Simulator</div>,
  };

  return <div className="backpack">
    <BackpackTabSelector views={Object.keys(views)} activeView={activeView} setActiveView={setActiveView} />
    <div className="backpack__main">
      <div className="backpack__setslist-sidebar__button"><HamburgerButton clickFunc={() => setSidebarOpen(!sidebarOpen)}/></div>
      {sidebarOpen && <div className="backpack__setslist-sidebar">
        <SavedSets />
      </div>}
      <div className="backpack__view-window">
        {views[activeView]}
      </div>
    </div>
  </div>
}

export default Backpack