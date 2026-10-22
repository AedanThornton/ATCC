// Simple component that has two LoadoutSlots and a the ability to swap between them. The second slot is always type "Attachment"
// --Note: Might make this more complicated for multi-cards. Thanks Gigantus

import { useEffect, useState } from "react"
import LoadoutSlot from "./LoadoutSlot"

const LoadoutSlotSwapper = ({ loadoutState, type = "", index, cardType = "Gear" }) => {
  const [currentSlot, setCurrentSlot] = useState("main")
  const slotName = `${cardType === "Gear" ? type : cardType}${index ?? ""}`
  const attachmentSlotName = `Attachment${type}${index ?? ""}`

  useEffect(() => {
    loadoutState.addSlot(slotName)
    cardType === "Gear" && type !== "Attachment" && loadoutState.addSlot(attachmentSlotName)
  }, [])

  function handleMainExhaust(state) {
    loadoutState.setState(slotName, "exhausted", state)
    loadoutState.setState(attachmentSlotName, "exhausted", state)
  }

  function handleMainDiscard(state) {
    loadoutState.setState(slotName, "discarded", state)
    loadoutState.setState(attachmentSlotName, "discarded", state)
  }

  const mainCardStates = {
    exhausted: loadoutState.slotStates[slotName]?.exhausted,
    setExhausted: handleMainExhaust,
    discarded: loadoutState.slotStates[slotName]?.discarded,
    setDiscarded: handleMainDiscard,
    highlighted: loadoutState.slotStates[slotName]?.highlighted,
    setHighlighted: (state) => loadoutState.setState(slotName, "highlighted", state),
  }

  const attachmentCardStates = {
    exhausted: loadoutState.slotStates[attachmentSlotName]?.exhausted,
    setExhausted: (state) => loadoutState.slotStates[slotName]?.exhausted ? {} : loadoutState.setState(attachmentSlotName, "exhausted", state),
    discarded: loadoutState.slotStates[attachmentSlotName]?.discarded,
    setDiscarded: (state) => loadoutState.slotStates[slotName]?.discarded ? {} : loadoutState.setState(attachmentSlotName, "discarded", state),
    highlighted: loadoutState.slotStates[attachmentSlotName]?.highlighted,
    setHighlighted: (state) => loadoutState.setState(attachmentSlotName, "highlighted", state),
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

  return (<div className={`loadout-slot-swapper ${getCardType(cardType)}`} style={{marginTop: "50px"}}> {/* Margin is to account for the slot icon */}
    <div 
      className={"loadout-slot-swapper__main" + (currentSlot === "main" ? " active" : " behind")} 
      onClick={() => currentSlot === "attachment" && setCurrentSlot("main")}
    >
      <LoadoutSlot slotName={slotName} type={type} index={index} cardType={cardType} menuDisabled={currentSlot !== "main"} cardStates={mainCardStates}/>
    </div>

    {cardType === "Gear" && type !== "Attachment" && <div 
      className={"loadout-slot-swapper__attachment" + (currentSlot === "attachment" ? " active" : " behind")} 
      onClick={() => currentSlot === "main" && setCurrentSlot("attachment")}
    >
      <LoadoutSlot slotName={attachmentSlotName} type={"Attachment"} index={type + index} cardType={"Gear"} menuDisabled={currentSlot !== "attachment"} cardStates={attachmentCardStates} />
    </div>}
  </div>)
}

export default LoadoutSlotSwapper