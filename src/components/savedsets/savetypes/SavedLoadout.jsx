import { useLocalStorage } from "../../../context/LocalStorageContext";
import "../savedsets.css"
import EditableTitle from "../../utils/EditableTitle";
import { useState } from "react";
import SavedSetsMenu from "../SavedSetsMenu";
import { useDroppable } from "@dnd-kit/react";
import SearchableList from "../../utils/SearchableList";
import { SavedSetCard } from "./SavedSet";
import getIcon from "../../utils/iconUtils";

const SavedLoadoutCard = ({ loadoutname, slot, index}) => {
  const { appState, cardCache, setSlot } = useLocalStorage();
  const slotType = slot === "Titan" ? slot : slot.slice(0, -1)

  const validCards = [...cardCache.entries()]
    .filter(([, card]) => card.cardType === slotType || card.slot === slotType || (slotType === "OneHanded" && card.slot?.includes("Hand")))
    .map(([, card]) => {return {id: card.cardIDs[0], name: card.name}})

  return (
    <div key={index} className="saved-sets__loadout-card">
      <div className="saved-sets__loadout-card__icon">{getIcon({name: slotType, invert: true})}</div>

      <div style={{flex: 1}}>{(loadoutname in appState.loadouts && slot in appState.loadouts[loadoutname] && appState.loadouts[loadoutname][slot])
        ? <SavedSetCard setname={loadoutname} cardID={appState.loadouts[loadoutname][slot]} removeFunc={(loadoutname, id) => setSlot(slot, null, loadoutname)} />
        : <SearchableList items={validCards} onItemClick={(id) => setSlot(slot, id, loadoutname)} customPlaceholder="Add card..." />
      }</div>
    </div>
  )
}

const SavedLoadout = ({ loadoutname, loadout, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addCardToSet, deleteLoadout, saveLoadout, loadLoadout, renameLoadout } = useLocalStorage();
  const {ref, isDropTarget} = useDroppable({ id: loadoutname, data: {onDrop: handleSetDrop} });

  function handleSetDrop(id){
    if (!id) return
    const idParts = id.split("-")
    const realID = idParts[idParts.length - 1]
    addCardToSet(loadoutname, realID)   
  }

  return (
    <div key={index} className="saved-set"
      ref={ref}
      style={{ 
        outline: isDropTarget ? "3px solid var(--accent-light)" : "initial",
        outlineOffset: "-3px"
      }}
      onClick={() => loadLoadout(loadoutname)}
    >

      <div className="saved-set__title-bar">
        <div className="saved-sets-button" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }}>{isOpen ? "▽" : "△"}</div>
        
        <EditableTitle titleID={index} onSave={renameLoadout} initialName={loadoutname} />
        
        <SavedSetsMenu options={[
          { title: "Duplicate", func: () => saveLoadout(loadoutname, loadout) },
          { title: "Delete", func: () => deleteLoadout(loadoutname) }
        ]} />
      </div>

      <ul className="saved-set__dropdown" style={{display: isOpen ? "block" : "none"}} onClick={(e) => e.stopPropagation()}>
        {Object.keys(loadout)?.map((slot, j) => 
          <div className="saved-sets-card__empty-slot">
            <SavedLoadoutCard loadoutname={loadoutname} slot={slot} index={j} />
          </div>
        )}
      </ul>

    </div>
  )
}

export default SavedLoadout