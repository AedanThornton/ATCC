//loadout slot arranger
//inputs: slotTypes (ol), numRows (#), isExtendible (bool)

import { useLoadout } from "../../context/LoadoutContext"
import PlusButton from "../utils/PlusButton"
import LoadoutSlotSwapper from "./slot/LoadoutSlotSwapper"

const LoadoutSlotGroup = ({cardType = "Gear", slotTypes = [], numRows = 1, isExtendible = false, extensionFunc = ()=>{}}) => {
  const { supportSlots } = useLoadout()
  
  return (
    <div className="loadout-slotgroup" style={{gridTemplateRows: `repeat(${numRows}, min-content)`}}>
      {slotTypes.map((type, i) => {
        return <LoadoutSlotSwapper cardType={cardType} type={type} index={i} />
      })}
      {isExtendible && supportSlots < 5 && <div className="mini-american loadout-slotgroup__add-slot">
        <PlusButton clickFunc={()=>extensionFunc()} />
      </div>}
    </div>
  )
}

export default LoadoutSlotGroup