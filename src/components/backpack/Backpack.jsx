import { useDroppable } from "@dnd-kit/react"
import "./Backpack.css"
import BackpackMenu from "./BackpackMenu";
import cardCache from "../../hooks/cardCache";
import { useLocalStorage } from "../../context/LocalStorageContext";

const Backpack = ({ isDragging }) => {
  const { ref, isDropTarget } = useDroppable({ id: "backpack" });
  const { backpack } = useLocalStorage()

  return <div className={`backpack-wrapper ${isDropTarget ? "is-drop-target" : ""} ${isDragging ? "backpack-open" : ""}`}>
    <div ref={ref} className={`drag-backpack`}>
      {backpack.map((card, i) => 
        <div className="drag-backpack-item">
          <CardRenderer cardname={cardCache.get(card)} key={i} variant="backpack" />
        </div>
      )}
    </div>
    <BackpackMenu />
  </div>
}

export default Backpack