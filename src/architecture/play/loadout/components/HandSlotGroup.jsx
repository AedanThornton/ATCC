import { useLoadoutContext } from "../hooks/LoadoutContext";
import { useLocalStorage } from "../../../../management/localstorage/LocalStorageContext";
import PlusButton from "../../../../components/utils/PlusButton";
import LoadoutSlotSwapper from "../slot/LoadoutSlotSwapper";

function createComboSlots({loadoutState, slotChunks = []}) {
  const { handSlots } = useLoadoutContext();

  let count = 0
  return slotChunks.map((size, i) => {
    if (count >= handSlots) return
    const slot = <LoadoutSlotSwapper loadoutState={loadoutState} type="OneHanded" index={count} cardType="Gear"/>
    count = count + size
    return slot
  })
}

export const HandSlotGroup = ({ loadoutState }) => {
  const { handSlots, addHandSlot } = useLoadoutContext();
  const { appState, cardCache } = useLocalStorage();

  const currentHandSlots = Object.keys(appState.activeLoadout).filter(key => key.slice(0, -1) === "OneHanded").map(key => appState.activeLoadout[key])
  const handSlotsData = currentHandSlots.map(slot => cardCache.get(slot))
  const slotChunks = handSlotsData.map(card => parseInt(card?.slot[0] || 1))

  return (
    <div className="loadout-slotgroup" style={{ gridTemplateRows: `repeat(1, min-content)` }}>

      {createComboSlots({loadoutState: loadoutState, slotChunks: slotChunks})}

      {handSlots < 5 && <div className="mini-american loadout-slotgroup__add-slot">
        <PlusButton clickFunc={() => addHandSlot()} />
      </div>}
    </div>
  )
}