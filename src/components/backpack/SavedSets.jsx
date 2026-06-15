import { useLocalStorage } from "../../context/LocalStorageContext";
import "./savedsets.css"
import { useModal } from "../../context/FocusContext";
import getIcon from "../utils/iconUtils";
import EditableTitle from "../utils/EditableTitle";
import { useState } from "react";

function SavedSet({setname, set, index}) {
  const [isOpen, setIsOpen] = useState(false)
  const { appState, cardCache, saveSet, deleteSet } = useLocalStorage();
  const { openModal } = useModal();
  const isBackpackSet = setname === "Backpack"
  
  const setDisplayHelper = (cardID) => {
    openModal("focusCard", { id: cardID })
  }

  const removeCardFromSet = (setName, cardID) => {
    saveSet(setName, appState.savedSets[setName].filter(c => c !== cardID))
  }

  const renameSet = (setName, newName) => {
    if (setName === newName) return
    saveSet(newName, appState.savedSets[setName])
    deleteSet(setName)
  }

  return (
    <div key={index} className="saved-set">

      <div className="saved-set__title-bar">
        <div className="saved-sets-button" onClick={() => setIsOpen(!isOpen)}>{isOpen ? "▽" : "△"}</div>
        {isBackpackSet
          ? <span>{getIcon({name: "Backpack", invert: true})} Backpack</span>
          : <EditableTitle titleID={index} onSave={renameSet} initialName={setname} />
        }
        <span className="saved-sets-button" onClick={() => deleteSet(setname)}>{getIcon({ name: "Trash", invert: true })}</span>
        {/* <span style={{ fontSize: "14px" }}>Cards in set: {appState.savedSets[set].length}</span> */}
      </div>

      {isOpen && <ul className="saved-set__dropdown">
        {set?.map((card, j) => {
          const cardData = cardCache.get(card)
          return <li key={j}>
            <div className="saved-sets-card-details clickable" onClick={() => !isBackpackSet && setDisplayHelper(cardCache.get(card)?.cardIDs[0])}>
              <span>{cardData?.name}</span>
              {!isBackpackSet && 
                <span 
                  className="saved-sets-button"
                  style={{ flex: "unset" }}
                  onClick={(e) => {e.stopPropagation(); removeCardFromSet(setname, card)}}
                >
                  {getIcon({ name: "Trash", invert: true })}
                </span>
              }
            </div>
          </li>
        })}

      </ul>}
    </div>
  )
}

function SavedSets() {
  const { appState } = useLocalStorage();

  return (
    <div className="saved-sets-panel">
      {appState.backpack && appState.backpack.length > 0 &&
        <SavedSet setname={"Backpack"} set={appState.backpack} />
      }
      {Object.keys(appState.savedSets).map((set, i) => (
        <SavedSet setname={set} set={appState.savedSets[set]} index={i} />
      ))}
      {Object.keys(appState.savedSets).length === 0 && 
        <div className="no-saved-sets">
          <p>No saved sets yet!</p>
        </div>
      }
    </div>
  );
}

export default SavedSets;