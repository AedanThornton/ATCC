import { useDroppable } from "@dnd-kit/react"
import "./Backpack.css"
import BackpackMenu from "./BackpackMenu";
import cardCache from "../../hooks/cardCache";
import { useLocalStorage } from "../../context/LocalStorageContext";
import CardRenderer from "../cards/CardRenderer";
import BackpackSetsManager from "./BackpackSetsManager";

const Backpack = ({ isDragging }) => {
  const { ref, isDropTarget } = useDroppable({ id: "backpack" });
  const { backpack } = useLocalStorage();
  const isNotMobile = window.matchMedia('(hover: hover)').matches;

  return <div className={`backpack-wrapper ${isDropTarget ? "is-drop-target" : ""} ${isDragging ? "backpack-open" : ""}`}>
    <BackpackSetsManager />
    <div ref={ref} className={`drag-backpack`}>
      {backpack.map((card, i) => 
        <div className="drag-backpack-item" key={i}>
          <CardRenderer cardData={cardCache.get(card)} variant="backpack" />
        </div>
      )}
    </div>
  </div>
}

export default Backpack