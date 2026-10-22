import { useState } from "react";
import { useSetEditContext } from "../../editor/set/hooks/SetEditContext";
import { useLocalStorage } from "../../../management/localstorage/LocalStorageContext";
import { useCollectionsContext } from "../hooks/CollectionsContext";
import { arraysEqual } from "../../../lib/arrays";


const collectionsLib = () => {
  const { appState, saveSet, loadSet, deleteSet } = useLocalStorage();
  const { setBackpackIsActive } = useSetEditContext();
  const { activeSetName, setActiveSetName } = useCollectionsContext();
  const [buttonError, setButtonError] = useState(null);

  const checkForSetNameMatch = () => {
    if (activeSetName === "Workspace") {
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
    if (!arraysEqual(appState.collections[activeSetName], appState.activeSet)){
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

    if (appState.collections.length >= 20) {
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
    saveSet(newName, appState.collections[setName])
    deleteSet(setName)
  }

  const handleClickOnSet = (setname, isWorkspaceSet = false, isSearchSet = false) => {
    setActiveSetName(setname)

    if (isWorkspaceSet) {
      loadSet(appState.backpack);
      setBackpackIsActive(true)
    } else if (isSearchSet) { 
      loadSet(appState.searchSet);
      setBackpackIsActive(false)
    } else {
      setBackpackIsActive(false)
      loadSet(appState.collections[setname]);
    }
  }

  const handleError = (msg) => {
    setButtonError("Error: " + msg)

    setTimeout(() => {
      setButtonError(null)
    }, 800)
  }

  const handleDeleteSet = (setname) => {
    if (activeSetName === setname) handleClickOnSet("Workspace")
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

export default collectionsLib