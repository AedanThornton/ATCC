import { Link, useSearchParams } from "react-router-dom"
import getIcon from "../utils/iconUtils"
import { useLocalStorage } from "../../context/LocalStorageContext";
import { useState, useRef } from "react";
import { useCards } from "../../hooks/useCards";

const BackpackSetsManager = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTermUI, setSearchTermUI] = useState("");
  const [saveError, setSaveError] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [buttonError, setButtonError] = useState(null)
  const [showSavedSets, setShowSavedSets] = useState(false);

  const { appState, saveSet, loadSet, deleteSet, clearBackpack, addToBackpack } = useLocalStorage();
  const { filteredCards, totalPages, totalCards, isLoading, error } = useCards(searchParams);
  
  const backpackSearchRef = useRef(null);

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
  }

  const handleImportSet = () => {
    filteredCards?.map((card) => {
      if (!appState.backpack.includes(card.cardIDs[0])) {
        addToBackpack(card.cardIDs[0])
      }
    })
  }

  const handleSearchUpdate = (term) => {
    if (term.length > 20) {
      term = term.slice(0, 20);
    }

    setSearchTermUI(term);
  }

  const handleLoadSet = (setName) => {
    loadSet(setName);
  }

  const handleDropdownSelect = (setName) => {
    setSearchTermUI(setName);
    setShowSavedSets(false);
    handleLoadSet(setName);
  }

  const handleReset = () => {
    setSearchTermUI("");
    backpackSearchRef.current?.blur();
    setShowSavedSets(false);
    clearBackpack();
  }

  const handleDeleteSet = (setName) => {
    deleteSet(setName);
    setSearchTermUI("");
  }

  return <div className="backpack-menu">
    <div className="backpack-sets-manager" onMouseLeave={() => setShowSavedSets(false)}>
      <div className="backpack-search-bar-wrapper">
        <button className="backpack-button" onClick={() => {backpackSearchRef.current?.focus(); setShowSavedSets(true)}}>{getIcon({ name: "DaedalusWorkshop", invert: true })}</button>

        <input
          type="text"
          ref={backpackSearchRef}
          placeholder="Saved Sets"
          value={searchTermUI}
          onChange={(e) => handleSearchUpdate(e.target.value)}
          onMouseEnter={() => setShowSavedSets(true)}
          className="backpack-search-bar"
        />

        {showSavedSets && (
          <div className="backpack-saved-sets-dropdown" style={{ width: backpackSearchRef.current.offsetWidth }}>
            {Object.keys(appState.savedSets).length === 0 && <div className="backpack-saved-set-item">No saved sets</div>}
            {Object.keys(appState.savedSets).map((setName) => {
              if (!setName.toLowerCase().includes(searchTermUI.toLowerCase())) return null;
              return <div className="backpack-saved-set-item" key={setName}  onClick={() => handleDropdownSelect(setName)}>
                {setName}
                <button className="backpack-button" onClick={(e) => {e.stopPropagation(); handleDeleteSet(setName)}}>{getIcon({ name: "Trash", invert: true })}</button>
              </div>
            })}
          </div>
        )}
      </div>

      <button className={`backpack-button ${saveError ? "backpack-menu-error" : ""}`} onClick={() => handleSaveSet(searchTermUI)}>{getIcon({ name: "Save", invert: true })}</button>
      <button className="backpack-button" onClick={() => handleImportSet()}>{getIcon({ name: "Load", invert: true })}</button>
    </div>

    <div>
      {children}

      {buttonError && <div className="backpack-error-overlay">
        <span>{buttonError}</span>
      </div>}
    </div>

    <button className="backpack-button clear-all" onClick={() => handleReset()}>Clear</button>
  </div>
}

export default BackpackSetsManager