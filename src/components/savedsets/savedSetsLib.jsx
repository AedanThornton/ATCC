import { useState } from "react";
import { useBackpackContext } from "../../context/BackpackContext";
import { useLocalStorage } from "../../context/LocalStorageContext";


const savedSetsLib = () => {
  const { appState, saveSet, loadSet, deleteSet } = useLocalStorage();
  const { setBackpackIsActive } = useBackpackContext();
  const [buttonError, setButtonError] = useState(null);

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
    saveSet(newName, appState.savedSets[setName])
    deleteSet(setName)
  }

  const handleClickOnSet = (setname) => {
    loadSet(appState.savedSets[setname]);

    if (setname === "Backpack") {
      setBackpackIsActive(true)
    } else {
      setBackpackIsActive(false)
    }
  }

  const handleError = (msg) => {
    setButtonError("Error: " + msg)

    setTimeout(() => {
      setButtonError(null)
    }, 800)
  }

  return {
    handleSaveSet,
    handleClickOnSet,
    renameSet,
    handleError,

    buttonError, setButtonError
  }
}

export default savedSetsLib