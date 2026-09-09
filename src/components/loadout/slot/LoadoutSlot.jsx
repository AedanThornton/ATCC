import { useState } from "react";
import { useDroppable } from "@dnd-kit/react"
import { useLocalStorage } from "../../../context/LocalStorageContext"
import CardRenderer from "../../cards/CardRenderer"
import LoadoutSlotCardMenu from "./LoadoutSlotCardMenu";
import getIcon from "../../utils/iconUtils";

const LoadoutSlot = ({ type = "", index, cardType = "gear" }) => {
  const [activeGear, setActiveGear] = useState({})
  const { cardCache } = useLocalStorage()
  const { ref, isDropTarget } = useDroppable({ id: `loadoutslot-${type}-${index}`, data: { onDrop: handleBackpackDrop } })

  function handleBackpackDrop(id) {
    if (!id) return
    const idParts = id.split("-")
    const realID = idParts[idParts.length - 1]
    const card = cardCache.get(realID)
    if (card) setActiveGear(card); else console.log("Invalid Obj dropped in LoadoutSlot")
  }

  function getCardType(cardType) {
    switch (cardType) {
      case "gear":
        return "mini-american"
      case "titan":
        return "half-page"
      case "mnemos":
        return "standard"
    }
  }

  //Gear selector
  return (
    <div className="loadout-slot" ref={ref} key={index}>
      {Object.keys(activeGear).length > 0 && <CardRenderer cardData={activeGear} menu={<LoadoutSlotCardMenu setActiveGear={setActiveGear} />} />}
      {/* {Object.keys(activeGear).length <= 0 && isDropTarget && <div className="loadout-slot__drop-preview"><CardRenderer cardData={activeGear} /></div>} */}
      {Object.keys(activeGear).length <= 0  &&
        <div className={`card ${getCardType(cardType)} loadout-slot__empty ${isDropTarget ? "target" : ""}`}>
          {getIcon({name: type, size: "5em", invert: true})}
        </div>
      }
    </div>
  )
}

export default LoadoutSlot;