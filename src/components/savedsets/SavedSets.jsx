import { useLocalStorage } from "../../context/LocalStorageContext";
import "./savedsets.css"
import { useModal } from "../../context/FocusContext";
import getIcon from "../utils/iconUtils";
import EditableTitle from "../utils/EditableTitle";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCards } from "../../hooks/useCards";
import SavedSetsMenu from "./SavedSetsMenu";

function SavedSet({setname, set, index}) {
  const [isOpen, setIsOpen] = useState(false)
  const { appState, cardCache, saveSet, loadSet, deleteSet } = useLocalStorage();
  const { openModal } = useModal();
  const isBackpackSet = setname === "Backpack" || setname === "Cards from Search"
  
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
  
  const handleSaveSet = (setName) => {
    if (typeof setName !== "string" || !setName) {
      handleError("Invalid set name");
      setSaveError(true);
      setTimeout(() => setSaveError(false), 500);
      return;
    }

    if (set.length === 0) {
      handleError("Cannot save empty set");
      setSaveError(true);
      setTimeout(() => setSaveError(false), 500);
      return;
    }

    if (appState.savedSets.length >= 20) {
      handleError("Max Saved Sets reached");
      setSaveError(true);
      setTimeout(() => setSaveError(false), 500);
      return;
    }

    saveSet(setName, set);
  }

  return (
    <div key={index} className="saved-set"
      style={{border: appState.activeSet === set ? "3px solid var(--accent)" : "3px solid #00000000"}}
      onClick={() => loadSet(set)}
    >

      <div className="saved-set__title-bar">
        <div className="saved-sets-button" onClick={(e) => {e.stopPropagation(); setIsOpen(!isOpen)}}>{isOpen ? "▽" : "△"}</div>
        {setname === "Backpack"
          ? <span>{getIcon({name: "Backpack", invert: true})} Backpack</span>
          : setname === "Cards from Search"
            ? <span>{setname}</span>
            : <EditableTitle titleID={index} onSave={renameSet} initialName={setname} />
        }
        {isBackpackSet
        ? <span className="saved-sets-button" onClick={(e) => {e.stopPropagation(); handleSaveSet(`New Set ${Object.keys(appState.savedSets).length + 1}`)}}>
            {getIcon({name: "Save", invert: true})}
          </span>
        : <SavedSetsMenu options={[
            {title: "Load", func: () => loadSet(set)},
            {title: "Delete", func: () => deleteSet(setname)}
          ]} />
        }
        
        {/* <span style={{ fontSize: "14px" }}>Cards in set: {appState.savedSets[set].length}</span> */}
      </div>

      {isOpen && <ul className="saved-set__dropdown" onClick={(e) => e.stopPropagation()}>
        {set?.map((card, j) => {
          const cardData = cardCache.get(card)
          return <li key={j}>
            <div className="saved-sets-card-details clickable" onClick={() => setDisplayHelper(cardCache.get(card)?.cardIDs[0])}>
              <span>{cardData?.name}</span>
              <span 
                className="saved-sets-button"
                style={{ flex: "unset" }}
                onClick={(e) => {e.stopPropagation(); removeCardFromSet(setname, card)}}
              >
                {getIcon({ name: "Trash", invert: true })}
              </span>
            </div>
          </li>
        })}

      </ul>}
    </div>
  )
}

function SavedSets() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [buttonError, setButtonError] = useState(null)

  const { appState, saveSet, loadSet, deleteSet, clearBackpack, addToBackpack } = useLocalStorage();
  const { data } = useCards(searchParams);
  const filteredCards = data?.cards

  const handleError = (msg) => {
    setButtonError("Error: " + msg)

    setTimeout(() => {
      setButtonError(null)
    }, 800)
  }

  const importFromCatalog = () => {
    filteredCards?.map((card) => {
      if (!appState.activeSet.includes(card.cardIDs[0])) {
        addToBackpack(card.cardIDs[0])
      }
    })
  }

  return (
    <div className="saved-sets-panel">
      {appState.activeSet && appState.activeSet.length > 0 &&
        <SavedSet setname={"Backpack"} set={appState.backpack} />
      }
      {appState.searchSet && appState.searchSet.length > 0 &&
        <SavedSet setname={"Cards from Search"} set={appState.searchSet} />
      }
      {Object.keys(appState.savedSets).map((set, i) => (
        <SavedSet setname={set} set={appState.savedSets[set]} index={i} />
      ))}
      {Object.keys(appState.savedSets).length === 0 && 
        <div className="no-saved-sets">
          <p>No saved sets yet!</p>
        </div>
      }
      
      {buttonError && <div className="backpack-error-overlay">
        <span>{buttonError}</span>
      </div>}
    </div>
  );
}

export default SavedSets;