//Card Menu for CardRenderer within a LoadoutSlot

import getIcon from "../../utils/iconUtils";

//buttons:
// * If gear and not attachment and not attachment slot already present, +Attachment button to add attachment slot
// * Exhaust (rotate sideways) -- switches to Unexhaust
// * Discard (gray-out)
// * Add counter (open sub-menu. Ambrosia, Midas, Energy, Generic)
// * Clear card (empties slot)

const LoadoutSlotCardMenu = ({ clearSlot, exhaustFunc, discardFunc }) => {
  return (
    <>
      <button onClick={() => exhaustFunc()}>{getIcon({name: "Exhaust", invert: true})}</button>
      <button onClick={() => discardFunc()}>{getIcon({name: "Discard", invert: true})}</button>
      <button onClick={() => clearSlot()}>✖</button>
    </>
  )
}

export default LoadoutSlotCardMenu;