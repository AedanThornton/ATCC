//loadout slot arranger
//inputs: slotTypes (ol), numRows (#), isExtendible (bool)

import PlusButton from "../utils/PlusButton"
import LoadoutSlot from "./slot/LoadoutSlot"

const LoadoutSlotGroup = ({cardType = "gear", slotTypes = [], numRows = 1, isExtendible = false}) => {
  return (
    <div className="loadout-slotgroup" style={{gridTemplateRows: `repeat(${numRows}, 1fr)`}}>
      {slotTypes.map((type, i) => <LoadoutSlot cardType={cardType} type={type} index={i} />)}
      {isExtendible && <div className="mini-american loadout-slotgroup__add-slot">
        <PlusButton clickFunc={()=>console.log("test")} />
      </div>}
    </div>
  )
}

export default LoadoutSlotGroup