import { createContext, useContext, useState, useEffect } from "react";

const LocalStorageContext = createContext();

export function LocalStorageProvider({ children }) {
  const [appState, setAppState] = useState(() => {
    const saved = localStorage.getItem("appState");
    return saved ? JSON.parse(saved) : {
      backpack: [],
      savedSets: {}
    };
  });

  const addToBackpack = (id) => setAppState(prev => ({
    ...prev,
    backpack: [...prev.backpack, id]
  }));

  const removeFromBackpack = (id) => setAppState(prev => ({
    ...prev,
    backpack: prev.backpack.filter(cardID => cardID !== id && cardID !== id.replace("backpack", ""))
  }));

  const clearBackpack = () => setAppState(prev => ({
    ...prev,
    backpack: []
  }));
  
  const saveSet = (name, ids) => setAppState(prev => ({
    ...prev,
    savedSets: {
      ...prev.savedSets,
      [name]: ids
    }
  }));

  const loadSet = (name) => setAppState(prev => ({
    ...prev,
    backpack: prev.savedSets[name]
  }));

  const deleteSet = (setName) => {
    setAppState(prev => {
      const newSavedSets = { ...prev.savedSets };
      delete newSavedSets[setName];

      return {
        ...prev,
        savedSets: newSavedSets
      };
    });
  }

  const backpack = appState.backpack
  const savedSets = appState.savedSets

  return (
    <LocalStorageContext.Provider value={{ appState, backpack, savedSets, addToBackpack, removeFromBackpack, clearBackpack, saveSet, loadSet, deleteSet }}>
      {children}
    </LocalStorageContext.Provider>
  );
}

export const useLocalStorage = () => useContext(LocalStorageContext);