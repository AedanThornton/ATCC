import { useLoadout } from "../../context/LoadoutContext";
import { useLocalStorage } from "../../context/LocalStorageContext";
import PlusButton from "../utils/PlusButton"
import LoadoutSlot from "./slot/LoadoutSlot";

function createComboSlots({slotChunks = []}) {
  const { handSlots } = useLoadout();

  let count = 0
  return slotChunks.map((size, i) => {
    if (count >= handSlots) return
    count = count + size
    return <LoadoutSlot type="OneHanded" index={i} cardType="Gear"/>
  })
}

export const HandSlotGroup = ({ }) => {
  const { handSlots, addHandSlot } = useLoadout();
  const { appState, cardCache } = useLocalStorage();

  const currentHandSlots = Array(handSlots).fill("OneHanded").map((slot, i) => slot + i)
  const handSlotsData = currentHandSlots.map(slot => cardCache.get(appState.activeLoadout[slot]))
  const slotChunks = handSlotsData.map(card => parseInt(card?.slot[0] || 1))

  return (
    <div className="loadout-slotgroup" style={{ gridTemplateRows: `repeat(1, min-content)` }}>

      {createComboSlots({slotChunks: slotChunks})}

      {handSlots < 5 && <div className="mini-american loadout-slotgroup__add-slot">
        <PlusButton clickFunc={() => addHandSlot()} />
      </div>}
    </div>
  )
}