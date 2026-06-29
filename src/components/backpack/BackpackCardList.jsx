import "./Backpack.css"
import { useLocalStorage } from "../../context/LocalStorageContext";
import CardRenderer from "../cards/CardRenderer";
import { useState } from "react";
import { useBackpackContext } from "../../context/BackpackContext";
import RectractableMenu from "../RetractableMenu";

const BackpackCardList = ({}) => {
  const { appState, cardCache } = useLocalStorage();
  const { backpackIsActive } = useBackpackContext();
  const [buttonError, setButtonError] = useState(null)

  const buttons = [
    {
      iconName: "LoadoutBuilder", 
      isDisabled: false, 
      clickFunc: () => console.log("Look a loadout!")
    }
  ]

  return (
    <>
      <div className={`backpack-card-list`}>
        {appState.activeSet?.map((card, i) => 
          <div className="drag-backpack-item" key={i}>
            {cardCache.get(card) && <CardRenderer cardData={cardCache.get(card)} variant={backpackIsActive ? "backpack" : "workspace"} />}
          </div>
        )}

        <RectractableMenu preformattedButtons={buttons} />
      </div>

      {buttonError && <div className="backpack-error-overlay">
        <span>{buttonError}</span>
      </div>}
    </>
  )
}

export default BackpackCardList