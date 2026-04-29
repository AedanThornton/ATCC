import { Link } from "react-router-dom"
import getIcon from "../utils/iconUtils"
import { useLocalStorage } from "../../context/LocalStorageContext";
import { useState } from "react";

const BackpackMenu = ({ setName }) => {
  const [saveError, setSaveError] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const { saveSet, loadSet, backpack, savedSets } = useLocalStorage();


  const handleSaveSet = () => {
    if (typeof setName !== "string" || !setName) {
      console.log("Invalid Set Name");
      setSaveError(true);
      setTimeout(() => setSaveError(false), 500);
      return;
    }

    saveSet(setName, backpack);
  }

  const handleLoadSet = () => {
    if (typeof setName !== "string" || !setName) {
      console.log("Invalid Set Name");
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

  return <div className="backpack-menu">
    <div onClick={() => handleSaveSet()} className={saveError ? "backpack-menu-error" : ""}>{getIcon({ name: "Save", invert: true })}</div>
    <div onClick={() => handleLoadSet()} className={loadError ? "backpack-menu-error" : ""}>{getIcon({ name: "Load", invert: true })}</div>
    <Link to="/compare">{getIcon({ name: "Compare", invert: true })}</Link>
    <Link to="/savedsets">{getIcon({ name: "SavedSets", invert: true })}</Link>
    <Link to="/deck">{getIcon({ name: "Deck", invert: true })}</Link>
    <Link to="/loadoutbuilder">{getIcon({ name: "LoadoutBuilder", invert: true })}</Link>
    <Link to="/simulator">{getIcon({ name: "Simulator", invert: true })}</Link>
  </div>
}

export default BackpackMenu