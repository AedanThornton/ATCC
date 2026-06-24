import "./Backpack.css"
import { useLocalStorage } from "../../context/LocalStorageContext";
import CardRenderer from "../cards/CardRenderer";
import { useState } from "react";

const BackpackCardList = ({}) => {
  const { appState, cardCache } = useLocalStorage();
  const [buttonError, setButtonError] = useState(null)

  return (
    <>
      <div className={`backpack-card-list`}>
        {appState.activeSet?.map((card, i) => 
          <div className="drag-backpack-item" key={i}>
            {cardCache.get(card) && <CardRenderer cardData={cardCache.get(card)} variant="backpack" />}
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