import { useSearchParams } from "react-router-dom"
import getIcon from "../utils/iconUtils"
import { useLocalStorage } from "../../context/LocalStorageContext";
import { useState, useRef } from "react";
import { useCards } from "../../hooks/useCards";
import SearchableList from "../utils/SearchableList";

const BackpackSetsManager = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTermUI, setSearchTermUI] = useState("");
  const [saveError, setSaveError] = useState(false)
  const [buttonError, setButtonError] = useState(null)
  const [showSavedSets, setShowSavedSets] = useState(false);

  const { appState, saveSet, loadSet, deleteSet, clearBackpack, addToBackpack } = useLocalStorage();
  const { data } = useCards(searchParams);
  const filteredCards = data?.cards
  
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
    backpackSearchRef.current?.blur();
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
    backpackSearchRef.current?.blur();
    setShowSavedSets(false);
    clearBackpack();
  }

  return <>
    {/* <div className="backpack-control-bar" onMouseLeave={() => setShowSavedSets(false)}>
      <button className="backpack-button" onClick={() => handleImportSet()}>{getIcon({ name: "Load", invert: true })}</button>
      <SearchableList 
        items={Object.keys(appState.savedSets).map(key => {return {id: key, name: key}})}
        onSearchEnter={handleSaveSet}
        onItemClick={handleLoadSet}
        customPlaceholder="Saved Sets"
        customEmptyMsg="No Saved Sets"
      />

      <button className={`backpack-button ${saveError ? "backpack-menu-error" : ""}`} onClick={() => handleSaveSet(searchTermUI)}>{getIcon({ name: "Save", invert: true })}</button>
      <button className="backpack-button clear-all" onClick={() => handleReset()}>Clear</button>
    </div> */}

    {children}

    {buttonError && <div className="backpack-error-overlay">
      <span>{buttonError}</span>
    </div>}
  </>
}

export default BackpackSetsManager