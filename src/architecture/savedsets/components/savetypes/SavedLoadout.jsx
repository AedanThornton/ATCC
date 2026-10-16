import React from "react";
import { useLocalStorage } from "../../../../management/localstorage/LocalStorageContext";
import "../../styles/savedsets.css"
import EditableTitle from "../../../../components/utils/EditableTitle";
import { useState } from "react";
import SavedSetsMenu from "../SavedSetsMenu";
import SearchableList from "../../../../components/utils/SearchableList";
import { SavedSetCard } from "./SavedSet";
import getIcon from "../../../../components/utils/iconUtils";

const SavedLoadoutCard = ({ loadoutname, slot, index}) => {
  const { appState, cardCache, setSlot, removeSlotFromLoadout } = useLocalStorage();
  const slotType = slot === "Titan" ? slot : slot.slice(0, -1)

  const handCount = Object.keys(appState.loadouts[loadoutname]).filter(key => key.slice(0, -1) === "OneHanded").length
  const supportCount = Object.keys(appState.loadouts[loadoutname]).filter(key => key.slice(0, -1) === "Support").length
  const slotTypeIndex = parseInt(slot.slice(-1))

  const removable = (slot.slice(0, -1) === "OneHanded" && handCount > 2)
    || (slot.slice(0, -1) === "Support" && supportCount > 1) 

  const validCards = [...cardCache.entries()]
    .filter(([, card]) => card.cardType === slotType || card.slot === slotType || (slotType === "OneHanded" && card.slot?.includes("Hand")))
    .map(([, card]) => {return {id: card.cardIDs[0], name: card.name}})

  const slotCard = cardCache.get(appState.loadouts[loadoutname][slot])

  function removeSlot(type, index, loadout, slotCount) {
    function rotateDown (range) {
      if (range - 1 - index < 0) return

      Array(range - 1 - index).fill("").map((_, i) => {
        setSlot(type + `${index + i}`, appState.loadouts[loadout][type + `${index + i + 1}`], loadout)
      })
      removeSlotFromLoadout(loadout, type + `${range - 1}`)
    }

    if (type === "OneHanded" || type === "Support") {
      rotateDown(slotCount)
    } else {
      console.error("Error: Non-removeable slot type attempted to be removed")
    }
  }

  return (
    <div className="saved-sets__loadout-item">
      <div key={index} className="saved-sets__loadout-card">
        <div className="saved-sets__loadout-card__icon">{getIcon({name: (slotType.includes("Hand") && slotCard) ? slotCard?.slot : slotType.replace(/\s+/g, ''), invert: true})}</div>

        <div style={{flex: 1}}>{(loadoutname in appState.loadouts && slot in appState.loadouts[loadoutname] && appState.loadouts[loadoutname][slot])
          ? <SavedSetCard setname={loadoutname} cardID={appState.loadouts[loadoutname][slot]} removeFunc={(loadoutname, id) => setSlot(slot, null, loadoutname)} />
          : <SearchableList items={validCards} onItemClick={(id) => setSlot(slot, id, loadoutname)} customPlaceholder="Add card..." />
        }</div>
      </div>

      {removable && <div className="saved-sets__loadout-item__button" onClick={(e) => {e.stopPropagation(); removeSlot(
        slot.slice(0, -1), 
        slotTypeIndex, 
        loadoutname, 
        Object.keys(appState.loadouts[loadoutname]).filter(key => key.includes(slot.slice(0, -1))).length
      )}}>
        DEL
      </div>}
    </div>
  )
}

const SavedLoadout = ({ loadoutname, loadout, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { appState, cardCache, deleteLoadout, saveLoadout, loadLoadout, renameLoadout, addSlotToLoadout } = useLocalStorage();
  // const {ref, isDropTarget} = useDroppable({ id: loadoutname, data: {onDrop: handleSetDrop} });
  
  function addHandSlotLoadout(loadoutName, slotCount) {
    if (slotCount >= 5) return
    
    addSlotToLoadout(loadoutName, `OneHanded${slotCount}`)
  }

  function addSupportSlotLoadout(loadoutName, slotCount) {
    if (slotCount >= 5) return
      
    addSlotToLoadout(loadoutName, `Support${slotCount}`)
  }

  const handCount = Object.keys(appState.loadouts[loadoutname]).filter(key => key.slice(0, -1) === "OneHanded").length
  const supportCount = Object.keys(appState.loadouts[loadoutname]).filter(key => key.slice(0, -1) === "Support").length

  // function handleSetDrop(id){
  //   if (!id) return
  //   const idParts = id.split("-")
  //   const realID = idParts[idParts.length - 1]
  //   addCardToSet(loadoutname, realID)   
  // }

  const sortedLoadout = Object.keys(loadout).sort().reduce(
    (obj, key) => {
      obj[key] = loadout[key];
      return obj
    }, {})

  return (
    <div key={index} className="saved-set"
      style={{ 
        outline: "initial",
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
        {Object.keys(sortedLoadout)?.map((slot, j) =>
          <React.Fragment key={j}>
            {/* This ugly ass logic is just to check whether or not a handslot should render... consider finding a way to improve this */}
            {!(slot.slice(0, -1) === "OneHanded" && 
            (parseInt(slot.slice(-1)) > 0 && cardCache.get(appState.loadouts[loadoutname][slot.slice(0, -1) + `${parseInt(slot.slice(-1)) - 1}`])?.slot?.[0] === "2") ||
            (parseInt(slot.slice(-1)) > 1 && 
                cardCache.get(appState.loadouts[loadoutname][slot.slice(0, -1) + `${parseInt(slot.slice(-1)) - 1}`])?.slot?.[0] === "2" ||
                cardCache.get(appState.loadouts[loadoutname][slot.slice(0, -1) + `${parseInt(slot.slice(-1)) - 2}`])?.slot?.[0] === "3"
            )) 
              &&
            <div className="saved-sets-card__empty-slot">
              <SavedLoadoutCard loadoutname={loadoutname} slot={slot} index={j} />
            </div>}

            {handCount < 5 && slot.slice(0, -1) === "OneHanded" && parseInt(slot.slice(-1)) === handCount - 1 &&
              <div className="saved-sets-card__empty-slot new-slot-button" onClick={() => addHandSlotLoadout(loadoutname, handCount)}>
                + {getIcon({name: "OneHanded", invert: true})}
              </div>
            }
            {supportCount < 5 && slot.slice(0, -1) === "Support" && parseInt(slot.slice(-1)) === supportCount - 1 &&
              <div className="saved-sets-card__empty-slot new-slot-button" onClick={() => addSupportSlotLoadout(loadoutname, supportCount)}>
                + {getIcon({name: "Support", invert: true})}
              </div>
            }
          </React.Fragment>
        )}
      </ul>

    </div>
  )
}

export default SavedLoadout