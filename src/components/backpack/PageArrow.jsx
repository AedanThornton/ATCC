import { useDroppable } from "@dnd-kit/react"
import "./pagearrow.css"
import { useState } from "react";
import Backpack from "./Backpack";

const PageArrow = ({ isDragging, icon }) => {
  const [openBackpack, setOpenBackpack] = useState(false)
  const [showBackpack, setShowBackpack] = useState(false)
  const { ref, isDropTarget } = useDroppable({ id: "backpack" });

  const handleOpen = () => {
    setOpenBackpack(!openBackpack)

    setTimeout(() => {
      setShowBackpack(!showBackpack)
    }, 150)
  }

  return <div ref={ref} className={`page-over ${isDropTarget ? "is-drop-target" : ""} ${isDragging ? "open" : ""} ${openBackpack ? "backpack-open" : ""}`}>
    <div onClick={() => handleOpen()} className={`page-over-arrow ${openBackpack ? "backpack-open" : ""}`}>{icon}</div>
    {showBackpack && <Backpack />}
  </div>
}

export default PageArrow