import { useLocalStorage } from "../../context/LocalStorageContext";
import "./savedsets.css"
import { useModal } from "../../context/FocusContext";
import getIcon from "../utils/iconUtils";
import { Link } from "react-router-dom";
import EditableTitle from "../utils/EditableTitle";
import { useState } from "react";

function SavedSet({set, index}) {
  const [isOpen, setIsOpen] = useState(false)
  const { appState, cardCache, saveSet, deleteSet } = useLocalStorage();
  const { openModal } = useModal();
  
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
        <EditableTitle titleID={index} onSave={renameSet} initialName={set} />
        <span className="saved-sets-button" onClick={() => deleteSet(set)}>{getIcon({ name: "Trash", invert: true })}</span>
        {/* <span style={{ fontSize: "14px" }}>Cards in set: {appState.savedSets[set].length}</span> */}
      </div>
      {isOpen && <ul className="saved-set__dropdown">

        {/* <li className="saved-sets-card-details title">
          <span>IDs</span>
          <span>Name</span>
          <span>Type</span>
          <span className="saved-sets-button" style={{ flex: "unset" }} ></span>
        </li> */}

        {appState.savedSets[set]?.map((card, j) => {
          const cardData = cardCache.get(card)
          return <li key={j}>
            <div className="saved-sets-card-details clickable" onClick={() => setDisplayHelper(cardCache.get(card)?.cardIDs[0])}>
              {/* <span>{cardData?.cardIDs.join(", ")}</span> */}
              <span>{cardData?.name}</span>
              {/* <span>{cardData?.cardType}</span> */}
              <span className="saved-sets-button" style={{ flex: "unset" }} onClick={(e) => {e.stopPropagation(); removeCardFromSet(set, card)}}>{getIcon({ name: "Trash", invert: true })}</span>
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
      {Object.keys(appState.savedSets).map((set, i) => (
        <SavedSet set={set} index={i} />
      ))}
      {Object.keys(appState.savedSets).length === 0 && 
        <div className="no-saved-sets">
          <p>No saved sets yet!</p>
          <p>Sets can be saved in the <Link to="/catalog">Card Catalog</Link> on the left popout panel.</p>
        </div>
      }
    </div>
  );
}

export default SavedSets;