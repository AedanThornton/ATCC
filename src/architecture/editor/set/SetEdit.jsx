import "./SetEdit.css"
import { useLocalStorage } from "../../../management/localstorage/LocalStorageContext";
import CardRenderer from "../../../components/cards/CardRenderer";
import { useState } from "react";
import { useSetEditContext } from "./hooks/SetEditContext";
import { useDroppable } from "@dnd-kit/react";

const SetEdit = ({}) => {
  const { appState, cardCache, addToActiveSet } = useLocalStorage();
  const { backpackIsActive } = useSetEditContext();
  const [buttonError, setButtonError] = useState(null)
  const {ref} = useDroppable({id: "setedit", data: {onDrop: handleSetEditDrop} })

  function handleSetEditDrop(id){
    if (!id) return
    const idParts = id.split("-")
    const realID = idParts[idParts.length - 1]
    addToActiveSet(realID)
  }

  return (
    <>
      <div className={`setedit-card-list`} ref={ref}>
        {appState.activeSet?.map((card, i) => 
          <div className="drag-setedit-item" key={i}>
            {cardCache.get(card) && <CardRenderer cardData={cardCache.get(card)} variant={backpackIsActive ? "workspace" : "play"} />}
          </div>
        )}
      </div>

      {buttonError && <div className="setedit-error-overlay">
        <span>{buttonError}</span>
      </div>}
    </>
  )
}

export default SetEdit