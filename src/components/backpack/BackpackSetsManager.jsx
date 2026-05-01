import { Link } from "react-router-dom"
import getIcon from "../utils/iconUtils"
import { useLocalStorage } from "../../context/LocalStorageContext";
import { useState, useRef } from "react";

const BackpackSetsManager = ({ }) => {
  const [searchTermUI, setSearchTermUI] = useState("");
  const [saveError, setSaveError] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [showSavedSets, setShowSavedSets] = useState(false);

  const { saveSet, loadSet, clearBackpack, backpack, savedSets } = useLocalStorage();
  const backpackSearchRef = useRef(null);
  const isNotMobile = window.matchMedia('(hover: hover)').matches;

  const handleSaveSet = (setName) => {
    if (typeof setName !== "string" || !setName) {
      console.log("Invalid set name");
      setSaveError(true);
      setTimeout(() => setSaveError(false), 500);
      return;
    }

    if (backpack.length === 0) {
      console.log("Cannot save empty backpack");
      setSaveError(true);
      setTimeout(() => setSaveError(false), 500);
      return;
    }

    if (savedSets.length >= 20) {
      console.log("Max Saved Sets reached");
      setSaveError(true);
      setTimeout(() => setSaveError(false), 500);
      return;
    }

    saveSet(setName, backpack);
  }

  const handleLoadSet = (setName) => {
    if (typeof setName !== "string" || !setName) {
      console.log("Invalid set name");
      setLoadError(true);
      setTimeout(() => setLoadError(false), 500);
      return;
    }    

    if (!Object.keys(savedSets).includes(setName)) {
      console.log("Set does not exist");
      setLoadError(true);
      setTimeout(() => setLoadError(false), 500);
      return;
    }

    loadSet(setName);
  }

  const handleSearchUpdate = (term) => {
    if (term.length > 20) {
      term = term.slice(0, 20);
    }

    setSearchTermUI(term);
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

  return <div className="backpack-sets-manager">
    <div className="backpack-search-bar-wrapper" onMouseLeave={() => setShowSavedSets(false)}>
      <div style={{ display: "flex" }}>
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
      </div>

      <button className={`backpack-button ${saveError ? "backpack-menu-error" : ""}`} onClick={() => handleSaveSet(searchTermUI)}>{getIcon({ name: "Save", invert: true })}</button>
      <button className={`backpack-button ${loadError ? "backpack-menu-error" : ""}`} onClick={() => handleLoadSet(searchTermUI)}>{getIcon({ name: "Load", invert: true })}</button>
      <button className="backpack-button clear-all" onClick={() => handleReset()}>{getIcon({ name: "Trash", invert: true })}</button>

      {showSavedSets && (
        <div className="backpack-saved-sets-dropdown">
          {Object.keys(savedSets).length === 0 && <div className="backpack-saved-set-item">No saved sets</div>}
          {Object.keys(savedSets).map((setName) => {
            if (!setName.toLowerCase().includes(searchTermUI.toLowerCase())) return null;
            return <div className="backpack-saved-set-item" key={setName} onClick={() => handleDropdownSelect(setName)}>
              {setName}
            </div>
          })}
        </div>
      )}
    </div>
  </div>
}

export default BackpackSetsManager