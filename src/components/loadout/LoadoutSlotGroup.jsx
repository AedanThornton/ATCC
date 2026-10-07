//loadout slot arranger
//inputs: slotTypes (ol), numRows (#), isExtendible (bool)

import { useLoadoutContext} from "../../context/LoadoutContext"
import PlusButton from "../utils/PlusButton"
import LoadoutSlotSwapper from "./slot/LoadoutSlotSwapper"

const LoadoutSlotGroup = ({loadoutState, cardType = "Gear", slotTypes = [], numRows = 1, isExtendible = false}) => {
  const { supportSlots, addSupportSlot } = useLoadoutContext()

  let extensionFunc = () => {}

  if (slotTypes.includes("Support")) {
    slotTypes = Array(supportSlots).fill("Support")
    extensionFunc = () => addSupportSlot()
  }
  
  return (
    <div className="loadout-slotgroup" style={{gridTemplateRows: `repeat(${numRows}, min-content)`}}>
      {slotTypes.map((type, i) => {
        return <LoadoutSlotSwapper loadoutState={loadoutState} cardType={cardType} type={type} index={i} />
      })}
      {isExtendible && supportSlots < 5 && <div className="mini-american loadout-slotgroup__add-slot">
        <PlusButton clickFunc={()=>extensionFunc()} />
      </div>}
    </div>
  )
}

export default LoadoutSlotGroup