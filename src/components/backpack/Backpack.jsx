import { useDroppable } from "@dnd-kit/react"
import "./pagearrow.css"
import { useState } from "react";
import BackpackCardList from "./BackpackCardList";
import BackpackTabSelector from "./BackpackTabSelector";
import SavedSets from "./SavedSets";
import DeckPage from "../../pages/DeckPage";
import Compare from "../compare/Compare";
import HamburgerButton from "../utils/HamburgerButton";

const Backpack = ({ isDragging, icon }) => {
  const [openBackpack, setOpenBackpack] = useState(false)
  const [showBackpack, setShowBackpack] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState("Backpack")
  const { ref, isDropTarget } = useDroppable({ id: "backpack" });

  const views = {
    "Backpack": <BackpackCardList />,
    "EditDeck": <DeckPage />,
    "Compare": <Compare />,
    // "LoadoutBuilder": <div style={{height: "1000px"}}>LoadoutBuilder</div>,
    // "Simulator": <div style={{height: "1000px"}}>Simulator</div>,
  };

  const handleOpen = () => {
    setOpenBackpack(!openBackpack)

    showBackpack
    ? setTimeout(() => {
        setShowBackpack(false)
      }, 500)
    : setShowBackpack(true)
  }

  return <div ref={ref} className={`page-over ${isDropTarget ? "is-drop-target" : ""} ${(isDragging && !openBackpack) ? "open" : ""} ${showBackpack ? "backpack-show" : ""} ${openBackpack ? "backpack-open" : ""}`}>
    <BackpackTabSelector showBackpack={showBackpack} views={Object.keys(views)} activeView={activeView} setActiveView={setActiveView} />
    <div className={`page-over-arrow ${openBackpack ? "backpack-open" : ""}`}>
      <div onClick={() => handleOpen()}>{icon}</div>
    </div>
    {showBackpack && <div className="page-over__main">
      {/* REPLACE BELOW WITH HAMBURGER BUTTON */}
      <div className="page-over__setslist-sidebar__button"><HamburgerButton clickFunc={() => setSidebarOpen(!sidebarOpen)}/></div>
      {sidebarOpen && <div className="page-over__setslist-sidebar">
        <SavedSets />
      </div>}
      <div className="page-over__view-window">
        {showBackpack && views[activeView]}
      </div>
    </div>}
  </div>
}

export default Backpack