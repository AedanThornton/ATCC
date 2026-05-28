import { useDroppable } from "@dnd-kit/react"
import "./pagearrow.css"
import { useState } from "react";
import BackpackCardList from "./BackpackCardList";
import BackpackTabSelector from "./BackpackTabSelector";
import SavedSetPage from "../../pages/SavedSetPage";
import DeckPage from "../../pages/DeckPage";

const Backpack = ({ isDragging, icon }) => {
  const [openBackpack, setOpenBackpack] = useState(false)
  const [showBackpack, setShowBackpack] = useState(false)
  const [activeView, setActiveView] = useState("Backpack")
  const { ref, isDropTarget } = useDroppable({ id: "backpack" });

  const views = {
    "Backpack": <BackpackCardList />,
    "EditDeck": <DeckPage />,
    "Compare": <div style={{height: "1000px"}}>Compare</div>,
    "LoadoutBuilder": <div style={{height: "1000px"}}>LoadoutBuilder</div>,
    "Simulator": <div style={{height: "1000px"}}>Simulator</div>,
    "List": <SavedSetPage />, 
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
    <div className="page-over-view-window">
      {showBackpack && views[activeView]}
    </div>
  </div>
}

export default Backpack