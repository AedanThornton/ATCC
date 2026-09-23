// Simple component that has two LoadoutSlots and a the ability to swap between them. The second slot is always type "Attachment"
// --Note: Might make this more complicated for multi-cards. Thanks Gigantus

import { useState } from "react"
import LoadoutSlot from "./LoadoutSlot"

const LoadoutSlotSwapper = ({ type = "", index, cardType = "Gear" }) => {
  const [currentSlot, setCurrentSlot] = useState("main")

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

  return (<div className={`loadout-slot-swapper ${getCardType(cardType)}`}>
    <div className={"loadout-slot-swapper__main" + (currentSlot === "main" ? " active" : " behind")} onClick={() => currentSlot === "attachment" && setCurrentSlot("main")}>
      <LoadoutSlot type={type} index={index} cardType={cardType} />
    </div>

    <div className={"loadout-slot-swapper__attachment" + (currentSlot === "attachment" ? " active" : " behind")} onClick={() => currentSlot === "main" && setCurrentSlot("attachment")}>
      <LoadoutSlot type={"Attachment"} index={type + index} cardType={"Gear"} />
    </div>
  </div>)
}

export default LoadoutSlotSwapper