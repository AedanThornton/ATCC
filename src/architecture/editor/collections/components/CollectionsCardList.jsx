import "../Collections.css"
import { useLocalStorage } from "../../../../management/localstorage/LocalStorageContext";
import CardRenderer from "../../../../components/cards/CardRenderer";
import { useState } from "react";
import { useCollectionsContext } from "../hooks/CollectionsContext";
import { useDroppable } from "@dnd-kit/react";

const CollectionsCardList = ({}) => {
  const { appState, cardCache, addToActiveSet } = useLocalStorage();
  const { backpackIsActive } = useCollectionsContext();
  const [buttonError, setButtonError] = useState(null)
  const {ref} = useDroppable({id: "collections", data: {onDrop: handleCollectionsDrop} })

  function handleCollectionsDrop(id){
    if (!id) return
    const idParts = id.split("-")
    const realID = idParts[idParts.length - 1]
    addToActiveSet(realID)
  }

  return (
    <>
      <div className={`collections-card-list`} ref={ref}>
        {appState.activeSet?.map((card, i) => 
          <div className="drag-collections-item" key={i}>
            {cardCache.get(card) && <CardRenderer cardData={cardCache.get(card)} variant={backpackIsActive ? "collections" : "workspace"} />}
          </div>
        )}
      </div>

      {buttonError && <div className="collections-error-overlay">
        <span>{buttonError}</span>
      </div>}
    </>
  )
}

export default CollectionsCardList