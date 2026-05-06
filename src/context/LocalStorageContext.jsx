import { createContext, useContext, useState } from "react";

const LocalStorageContext = createContext();

export function LocalStorageProvider({ children }) {
  const [cardCache, setCardCache] = useState(new Map());
  const [appState, setAppState] = useState(() => {
    const saved = localStorage.getItem("appState");

    if (!saved) return {
      backpack: [],
      savedSets: {}
    };

    const parsed = JSON.parse(saved);

    return {
      ...parsed,
      backpack: parsed.backpack ?? [],
      savedSets: parsed.savedSets ?? {}
    };
  });

  function ingestCards(cards) {
    setCardCache(prev => {
      const newMap = new Map(prev);

      cards?.forEach(c => {
        newMap.set(c.cardIDs[0], c);
      });

      return newMap;
    });
  }

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
    backpack: prev.savedSets[name] || []
  }));

  const deleteSet = (setName) => setAppState(prev => {
    const newSavedSets = { ...prev.savedSets };
    delete newSavedSets[setName];

    return {
      ...prev,
      savedSets: newSavedSets
    };
  });

  return (
    <LocalStorageContext.Provider 
      value={{ 
        appState, cardCache,
        ingestCards,
        addToBackpack, removeFromBackpack, clearBackpack, 
        saveSet, loadSet, deleteSet }}>
      {children}
    </LocalStorageContext.Provider>
  );
}

export const useLocalStorage = () => useContext(LocalStorageContext);