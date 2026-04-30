import { Link } from "react-router-dom"
import getIcon from "../utils/iconUtils"
import { useLocalStorage } from "../../context/LocalStorageContext";
import { useState, useRef } from "react";

const BackpackMenu = ({ }) => {
  const [searchTermUI, setSearchTermUI] = useState("");
  const [saveError, setSaveError] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const { saveSet, loadSet, backpack, savedSets } = useLocalStorage();
  const backpackSearchRef = useRef(null);

  const handleSaveSet = () => {
    if (typeof searchTermUI !== "string" || !searchTermUI) {
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

    saveSet(searchTermUI, backpack);
  }

  const handleLoadSet = () => {
    if (typeof searchTermUI !== "string" || !searchTermUI) {
      console.log("Invalid set name");
      setLoadError(true);
      setTimeout(() => setLoadError(false), 500);
      return;
    }    

    if (!Object.keys(savedSets).includes(searchTermUI)) {
      console.log("Set does not exist");
      setLoadError(true);
      setTimeout(() => setLoadError(false), 500);
      return;
    }

    loadSet(searchTermUI);
  }

  const handleSearchUpdate = (term) => {
    if (term.length > 20) {
      term = term.slice(0, 20);
    }

    setSearchTermUI(term);
  }

  return <>
    <div className="backpack-search-bar-wrapper">
      <button onClick={() => backpackSearchRef.current?.focus()}>{getIcon({ name: "DaedalusWorkshop", invert: true })}</button>

      <input
        type="text"
        ref={backpackSearchRef}
        placeholder="Saved Sets"
        value={searchTermUI}
        onChange={(e) => handleSearchUpdate(e.target.value)}
        className="backpack-search-bar"
      />

      <button onClick={() => handleSaveSet()} className={saveError ? "backpack-menu-error" : ""}>{getIcon({ name: "Save", invert: true })}</button>
      <button onClick={() => handleLoadSet()} className={loadError ? "backpack-menu-error" : ""}>{getIcon({ name: "Load", invert: true })}</button>
    </div>

    <div className="backpack-menu">
      <Link to="/compare">{getIcon({ name: "Compare", invert: true })}</Link>
      <Link to="/savedsets">{getIcon({ name: "SavedSets", invert: true })}</Link>
      <Link to="/deck">{getIcon({ name: "Deck", invert: true })}</Link>
      <Link to="/loadoutbuilder">{getIcon({ name: "LoadoutBuilder", invert: true })}</Link>
      <Link to="/simulator">{getIcon({ name: "Simulator", invert: true })}</Link>
    </div>
  </>
}

export default BackpackMenu