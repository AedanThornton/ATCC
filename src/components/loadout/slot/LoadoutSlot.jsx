import { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/react"
import { useLocalStorage } from "../../../context/LocalStorageContext"
import CardRenderer from "../../cards/CardRenderer"
import LoadoutSlotCardMenu from "./LoadoutSlotCardMenu";
import getIcon from "../../utils/iconUtils";
import { useDnD } from "../../../context/DnDContext";

const LoadoutSlot = ({ type = "", index, cardType = "Gear" }) => {
  const { appState, cardCache, setSlot } = useLocalStorage()
  const { ref, isDropTarget } = useDroppable({ id: `loadoutslot-${type}-${index}`, data: { onDrop: handleBackpackDrop } })
  const { dragCard } = useDnD();

  const slotName = `${cardType === "Gear" ? type : cardType}${index ?? ""}`
  const displayDropPreview = isDropTarget && cardTypeCompare(dragCard, cardType, type)
  const activeGear = cardCache.get(appState.activeLoadout[slotName]) || {}

  function gearSlotCompare(cardSlot, reqSlot) {
    if (reqSlot === "OneHanded") {
      return cardSlot.includes("Hand")
    }
    return cardSlot === reqSlot
  }

  function cardTypeCompare(card, reqType, reqSlot) {
    if ((card?.cardType || "") === reqType) {
      if (cardType === "Gear" ? gearSlotCompare(card?.slot || "", reqSlot) : true) {
        return true
      }
    }
    return false
  }

  function handleBackpackDrop(id) {
    if (!id) return
    const idParts = id.split("-")
    const realID = idParts[idParts.length - 1]
    const card = cardCache.get(realID)
    if (card) {

      if (cardTypeCompare(card, cardType, type)) {
        setSlot(slotName, realID)
      } else {
        //handleError
      }

    } else console.log("Invalid Obj dropped in LoadoutSlot")
  }

  function getCardType(cardType) {
    switch (cardType) {
      case "Gear":
        return "mini-american"
      case "Pattern":
        return "mini-american"
      case "Titan":
        return "half-page"
      case "Mnemos":
        return "standard"
      case "Fated Mnemos":
        return "standard"
    }
  }

  //Gear selector
  return (
    <div className="loadout-slot" ref={!cardTypeCompare(dragCard, cardType, type) ? ref : null} key={index}>
      {Object.keys(activeGear).length > 0 && <CardRenderer cardData={activeGear} menu={<LoadoutSlotCardMenu setActiveGear={(id) => setSlot(slotName, id)} />} />}
      {Object.keys(activeGear).length <= 0 && <>

        <div className={`card ${getCardType(cardType)} loadout-slot__empty ${isDropTarget ? "target" : ""} ${(Object.keys(dragCard).length > 0 && !cardTypeCompare(dragCard, cardType, type)) ? " is-drop-option" : ""}`}
          style={{display: displayDropPreview ? "none" : "flex"}}
        >
          {getIcon({name: type, size: "5em", invert: true})}
        </div>

        <div className="loadout-slot__drop-preview"
          style={{display: displayDropPreview ? "block" : "none"}}
        >
          {Object.keys(dragCard).length > 0 && <CardRenderer cardData={dragCard} />}
        </div>
        
      </>}

    </div>
  )
}

export default LoadoutSlot;