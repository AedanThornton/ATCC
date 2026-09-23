import "./Backpack.css"
import { useLocalStorage } from "../../context/LocalStorageContext";
import CardRenderer from "../cards/CardRenderer";
import { useState } from "react";
import { useBackpackContext } from "../../context/BackpackContext";
import { useDroppable } from "@dnd-kit/react";

const BackpackCardList = ({}) => {
  const { appState, cardCache, addToActiveSet } = useLocalStorage();
  const { backpackIsActive } = useBackpackContext();
  const [buttonError, setButtonError] = useState(null)
  const {ref} = useDroppable({id: "backpack", data: {onDrop: handleBackpackDrop} })

  function handleBackpackDrop(id){
    if (!id) return
    const idParts = id.split("-")
    const realID = idParts[idParts.length - 1]
    addToActiveSet(realID)
  }

  return (
    <>
      <div className={`backpack-card-list`} ref={ref}>
        {appState.activeSet?.map((card, i) => 
          <div className="drag-backpack-item" key={i}>
            {cardCache.get(card) && <CardRenderer cardData={cardCache.get(card)} variant={backpackIsActive ? "backpack" : "workspace"} />}
          </div>
        )}
      </div>

      {buttonError && <div className="backpack-error-overlay">
        <span>{buttonError}</span>
      </div>}
    </>
  )
}

export default BackpackCardList