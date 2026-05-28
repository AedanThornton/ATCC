import { useDroppable } from "@dnd-kit/react"
import "./pagearrow.css"
import { useState } from "react";
import BackpackCardList from "./BackpackCardList";
import BackpackTabSelector from "./BackpackTabSelector";

const Backpack = ({ isDragging, icon }) => {
  const [openBackpack, setOpenBackpack] = useState(false)
  const [showBackpack, setShowBackpack] = useState(false)
  const { ref, isDropTarget } = useDroppable({ id: "backpack" });

  const handleOpen = () => {
    setOpenBackpack(!openBackpack)

    showBackpack
    ? setTimeout(() => {
        setShowBackpack(false)
      }, 500)
    : setShowBackpack(true)
  }

  return <div ref={ref} className={`page-over ${isDropTarget ? "is-drop-target" : ""} ${(isDragging && !openBackpack) ? "open" : ""} ${showBackpack ? "backpack-show" : ""} ${openBackpack ? "backpack-open" : ""}`}>
    <BackpackTabSelector showBackpack={showBackpack} />
    <div onClick={() => handleOpen()} className={`page-over-arrow ${openBackpack ? "backpack-open" : ""}`}>{icon}</div>
    <div style={{flex: 1}}>
      {showBackpack && <BackpackCardList />}
    </div>
  </div>
}

export default Backpack