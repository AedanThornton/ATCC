import { useDroppable } from "@dnd-kit/react"
import "./Backpack.css"
import BackpackMenu from "./BackpackMenu";
import { useLocalStorage } from "../../context/LocalStorageContext";
import CardRenderer from "../cards/CardRenderer";
import BackpackSetsManager from "./BackpackSetsManager";

const Backpack = ({ isDragging }) => {
  const { ref, isDropTarget } = useDroppable({ id: "backpack" });
  const { appState, cardCache } = useLocalStorage();

  return <div className={`backpack-wrapper ${isDropTarget ? "is-drop-target" : ""} ${isDragging ? "backpack-open" : ""}`}>
    <BackpackSetsManager>
      <div ref={ref} className={`drag-backpack`}>
        {appState.backpack?.map((card, i) => 
          <div className="drag-backpack-item" key={i}>
            {cardCache.get(card) && <CardRenderer cardData={cardCache.get(card)} variant="backpack" />}
          </div>
        )}
      </div>
    </BackpackSetsManager>
  </div>
}

export default Backpack