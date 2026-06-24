import { createContext, useContext, useState } from "react";

const LocalStorageContext = createContext();

export function LocalStorageProvider({ children }) {
  const [cardCache, setCardCache] = useState(new Map());
  const [appState, setAppState] = useState(() => {
    const saved = localStorage.getItem("appState");

    if (!saved) return {
      activeSet: [],
      backpack: [],
      savedSets: {}
    };

    const parsed = JSON.parse(saved);

    return {
      ...parsed,
      activeSet: parsed.activeSet ?? [],
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

  const addToBackpack = (id) => {
    if (appState.activeSet.includes(id)) return
    setAppState(prev => ({
      ...prev,
      activeSet: [...prev.activeSet, id]
    }))
  };

  const removeFromBackpack = (id) => setAppState(prev => ({
    ...prev,
    activeSet: prev.activeSet.filter(cardID => cardID !== id && cardID !== id.replace("activeSet", ""))
  }));

  const clearBackpack = () => setAppState(prev => ({
    ...prev,
    activeSet: []
  }));
  
  const saveSet = (name, ids) => setAppState(prev => ({
    ...prev,
    savedSets: {
      ...prev.savedSets,
      [name]: ids
    }
  }));

  const loadSet = (cardSet) => setAppState(prev => ({
    ...prev,
    activeSet: cardSet || []
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