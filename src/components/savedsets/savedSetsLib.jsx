import { useState } from "react";
import { useBackpackContext } from "../../context/BackpackContext";
import { useLocalStorage } from "../../context/LocalStorageContext";
import { useSavedSetsContext } from "../../context/SavedSetsContext";


const savedSetsLib = () => {
  const { appState, saveSet, loadSet, deleteSet } = useLocalStorage();
  const { setBackpackIsActive } = useBackpackContext();
  const { activeSetName, setActiveSetName } = useSavedSetsContext();
  const [buttonError, setButtonError] = useState(null);

  const arraysEqual = (a, b) => {
    return a?.length === b?.length &&
    a.every((value, i) => value === b[i]);
  }

  const checkForSetNameMatch = () => {
    if (activeSetName === "Backpack") {
      if (!arraysEqual(appState.backpack, appState.activeSet)){
        setActiveSetName(null)
      }
      return
    }
    if (activeSetName === "Current Search") {
      if (!arraysEqual(appState.searchSet, appState.activeSet)){
        setActiveSetName(null)
      }
      return
    }
    if (!arraysEqual(appState.savedSets[activeSetName], appState.activeSet)){
      setActiveSetName(null)
      return
    }
  }

  const handleSaveSet = (setName, set) => {
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

  const renameSet = (setName, newName) => {
    if (setName === newName) return
    if (activeSetName == setName) setActiveSetName(newName)
    saveSet(newName, appState.savedSets[setName])
    deleteSet(setName)
  }

  const handleClickOnSet = (setname, isBackpackSet, isSearchSet) => {
    setActiveSetName(setname)

    if (isBackpackSet) {
      loadSet(appState.backpack);
      setBackpackIsActive(true)
    } else if (isSearchSet) { 
      loadSet(appState.searchSet);
      setBackpackIsActive(false)
    } else {
      setBackpackIsActive(false)
      loadSet(appState.savedSets[setname]);
    }
  }

  const handleError = (msg) => {
    setButtonError("Error: " + msg)

    setTimeout(() => {
      setButtonError(null)
    }, 800)
  }

  const handleDeleteSet = (setname) => {
    if (activeSetName === setname) handleClickOnSet("Backpack")
    deleteSet(setname)
  }

  return {
    handleSaveSet,
    handleDeleteSet,
    handleClickOnSet,
    renameSet,
    handleError,
    checkForSetNameMatch,

    buttonError, setButtonError
  }
}

export default savedSetsLib