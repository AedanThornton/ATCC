import { useLocalStorage } from "../../../../management/localstorage/LocalStorageContext"
import CardRenderer from "../../../../components/cards/CardRenderer";
import LoadoutSlotCardMenu from "./LoadoutSlotCardMenu";
import getIcon from "../../../../components/utils/iconUtils";
import { useLoadoutContext } from "../hooks/LoadoutContext";

const LoadoutSlot = ({ 
    slotName = "", 
    type = "", 
    index, 
    cardType = "Gear", 
    menuDisabled = false, 
    loadoutName = "",
    cardStates = {exhausted: false, setExhausted: ()=>{}, discarded: false, setDiscarded: ()=>{}, highlighted: false, setHighlighted: () => {}} 
  }) => {

  const { appState, cardCache } = useLocalStorage()
  const { handSlots } = useLoadoutContext()

  const isWeaponSlot = type.includes("Hand")
  const activeGear = cardCache.get(appState.loadouts?.[loadoutName]?.[slotName]) || {}

  function checkEmptySlotsForMultihanders(handsNeeded, currentIndex) {
    if (!handsNeeded) return false
    if (handsNeeded < 2) return true
    if (!appState.loadouts?.[loadoutName]) return false
    return Array(handsNeeded - 1).fill("").every((_, i) => {
      return (`OneHanded${currentIndex + i + 1}` in appState.loadouts?.[loadoutName] && currentIndex + i + 1 < handSlots)
        ? !appState.loadouts?.[loadoutName][`OneHanded${currentIndex + i + 1}`]
        : handSlots - currentIndex >= handsNeeded
    })
  }

  function gearSlotCompare(cardSlot, reqSlot) {
    if (reqSlot === "OneHanded") {
      const hasRoom = checkEmptySlotsForMultihanders(parseInt(cardSlot[0]), index)

      return cardSlot.includes("Hand") && hasRoom
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
  
  return (
    <div className="loadout-slot" key={index}>
      <div className="loadout-slot__icon-display">{getIcon({ 
        name: Object.keys(activeGear).length > 0
          ? (cardType === "Gear" ? activeGear.slot : activeGear.cardType.replace(/\s+/g, ''))
          : type, 
        size: "2em", 
        invert: true 
      })}</div>

      {Object.keys(activeGear).length > 0 && 
        <div className={"card loadout-slot__filled-slot" + (cardStates.highlighted ? " highlighted" : "")}
          onPointerEnter={() => cardStates.setHighlighted(true)}
          onPointerLeave={() => cardStates.setHighlighted(false)}
        >
          {cardStates.exhausted && !cardStates.discarded && <div className="card loadout-slot__state-cover">{getIcon({name: "Exhaust", invert: true, size: "2em"})}</div>}
          {cardStates.discarded && <div className="card loadout-slot__state-cover">{getIcon({name: "Discard", invert: true, size: "2em"})}</div>}

          <CardRenderer cardData={activeGear} menu={menuDisabled ? <></> : 
            <LoadoutSlotCardMenu
              exhaustFunc={() => cardStates.setExhausted(!cardStates.exhausted)}
              discardFunc={() => cardStates.setDiscarded(!cardStates.discarded)}
            />
          } />
        </div>
      }
      {Object.keys(activeGear).length <= 0 && <>

        <div className={`card ${getCardType(cardType)} loadout-slot__empty`}>
          {!isWeaponSlot && getIcon({ name: type, size: "5em", invert: true })}
          {isWeaponSlot && <>
            <>{getIcon({ name: "1 Hand", size: "5em", invert: true })}</>
            <>{checkEmptySlotsForMultihanders(2, index) && getIcon({ name: "2 Hands", size: "5em", invert: true })}</>
            <>{checkEmptySlotsForMultihanders(3, index) && getIcon({ name: "3 Hands", size: "5em", invert: true })}</>
          </>}
        </div>
      </>}

    </div>
  )
}

export default LoadoutSlot;