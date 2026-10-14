//Card Menu for CardRenderer within a LoadoutSlot

import getIcon from "../../utils/iconUtils";

//buttons:
// * If gear and not attachment and not attachment slot already present, +Attachment button to add attachment slot
// * Add counter (open sub-menu. Ambrosia, Midas, Energy, Generic)

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