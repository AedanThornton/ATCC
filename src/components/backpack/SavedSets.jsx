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
        {isBackpackSet
        ? <span></span>
        : <SavedSetsMenu options={[
          {title: "Load", func: () => loadSet(setname)},
          {title: "Delete", func: () => deleteSet(setname)}
        ]}>
          <span className="saved-sets-button">
            {getIcon({name: "Options", invert: true})}
          </span>
        </SavedSetsMenu>}
        
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTermUI, setSearchTermUI] = useState("");
  const [saveError, setSaveError] = useState(false)
  const [buttonError, setButtonError] = useState(null)
  const [showSavedSets, setShowSavedSets] = useState(false);

  const { appState, saveSet, loadSet, deleteSet, clearBackpack, addToBackpack } = useLocalStorage();
  const { data } = useCards(searchParams);
  const filteredCards = data?.cards

  const handleError = (msg) => {
    setButtonError("Error: " + msg)

    setTimeout(() => {
      setButtonError(null)
    }, 800)
  }

  const handleSaveSet = (setName) => {
    if (typeof setName !== "string" || !setName) {
      handleError("Invalid set name");
      setSaveError(true);
      setTimeout(() => setSaveError(false), 500);
      return;
    }

    if (appState.backpack.length === 0) {
      handleError("Cannot save empty backpack");
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

    saveSet(setName, appState.backpack);
    setShowSavedSets(false)
  }

  const handleImportSet = () => {
    filteredCards?.map((card) => {
      if (!appState.backpack.includes(card.cardIDs[0])) {
        addToBackpack(card.cardIDs[0])
      }
    })
  }

  const handleLoadSet = (setName) => {
    loadSet(setName);
  }

  const handleReset = () => {
    setSearchTermUI("");
    setShowSavedSets(false);
    clearBackpack();
  }

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
      <div className="saved-sets__new-set-button" onClick={() => handleSaveSet(`New Set ${Object.keys(appState.savedSets).length + 1}`)}>
        {getIcon({name: "Save", invert: true})} Save Current as New Set
      </div>
      
      {buttonError && <div className="backpack-error-overlay">
        <span>{buttonError}</span>
      </div>}
    </div>
  );
}

export default SavedSets;