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
      let changed = false;
      const newMap = new Map(prev);

      cards?.forEach(card => {
        if (newMap.get(card.cardIDs[0]) !== card) {
          newMap.set(card.cardIDs[0], card);
          changed = true;
        }
      });

      return changed ? newMap : prev;
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
  
  function checkNames(origName, name = origName, i = 1) {
    if (name in appState.savedSets) {
      return checkNames(origName, origName + " " + i, i + 1)
    } else {
      return name
    }
  }
  const saveSet = (name, ids) => setAppState(prev => ({
    ...prev,
    savedSets: {
      ...prev.savedSets,
      [checkNames(name)]: ids
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

  const removeCardFromSet = (setName, cardID) => setAppState(prev => ({
    ...prev,
    savedSets: {
      ...prev.savedSets,
      [setName]: prev.savedSets[setName].filter(c => c !== cardID)
    }
  }));

  return (
    <LocalStorageContext.Provider 
      value={{ 
        appState, cardCache,
        ingestCards,
        addToBackpack, removeFromBackpack, addToActiveSet, removeFromActiveSet, clearActiveSet, 
        saveSet, loadSet, deleteSet, removeCardFromSet,
        updateSearchSet }}>
      {children}
    </LocalStorageContext.Provider>
  );
}

export const useLocalStorage = () => useContext(LocalStorageContext);