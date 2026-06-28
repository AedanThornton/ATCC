import { createContext, useContext, useState } from "react";

const LocalStorageContext = createContext();

export function LocalStorageProvider({ children }) {
  const [cardCache, setCardCache] = useState(new Map());
  const [appState, setAppState] = useState(() => {
    const saved = localStorage.getItem("appState");

    if (!saved) return {
      activeSet: [],
      searchSet: [],
      backpack: [],
      savedSets: {}
    };

    const parsed = JSON.parse(saved);

    return {
      ...parsed,
      activeSet: parsed.activeSet ?? [],
      searchSet: parsed.searchSet ?? [],
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
    if (appState.backpack.includes(id)) return 1
    setAppState(prev => ({
      ...prev,
      backpack: [...prev.backpack, id]
    }))

    return 0
  };

  const removeFromBackpack = (id) => setAppState(prev => ({
    ...prev,
    backpack: prev.backpack.filter(cardID => cardID !== id)
  }));

  const addToActiveSet = (id) => {
    if (appState.activeSet.includes(id)) return 1
    setAppState(prev => ({
      ...prev,
      activeSet: [...prev.activeSet, id]
    }))

    return 0
  };

  const removeFromActiveSet = (id) => setAppState(prev => ({
    ...prev,
    activeSet: prev.activeSet.filter(cardID => cardID !== id)
  }));

  const clearActiveSet = () => setAppState(prev => ({
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

  const updateSearchSet = ({cardIDs}) => setAppState(prev => ({
    ...prev,
    searchSet: cardIDs || []
  }));

  return (
    <LocalStorageContext.Provider 
      value={{ 
        appState, cardCache,
        ingestCards,
        addToBackpack, removeFromBackpack, addToActiveSet, removeFromActiveSet, clearActiveSet, 
        saveSet, loadSet, deleteSet,
        updateSearchSet }}>
      {children}
    </LocalStorageContext.Provider>
  );
}

export const useLocalStorage = () => useContext(LocalStorageContext);