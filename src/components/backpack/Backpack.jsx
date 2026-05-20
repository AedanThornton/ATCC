import { useDroppable } from "@dnd-kit/react"
import "./Backpack.css"
import { useLocalStorage } from "../../context/LocalStorageContext";
import CardRenderer from "../cards/CardRenderer";
import BackpackSetsManager from "./BackpackSetsManager";

const Backpack = ({}) => {
  const { appState, cardCache } = useLocalStorage();

  return (
    <BackpackSetsManager>
      <div className={`backpack`}>
        {appState.backpack?.map((card, i) => 
          <div className="drag-backpack-item" key={i}>
            {cardCache.get(card) && <CardRenderer cardData={cardCache.get(card)} variant="backpack" />}
          </div>
        )}
      </div>
    </BackpackSetsManager>
  )
}

export default Backpack