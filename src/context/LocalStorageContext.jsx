import { createContext, useContext, useState } from "react";

const LocalStorageContext = createContext();

export function LocalStorageProvider({ children }) {
  const [cardCache, setCardCache] = useState(new Map());
  const [appState, setAppState] = useState(() => {
    const saved = localStorage.getItem("appState");

    if (!saved) return {
      activeSet: [],
      activeLoadout: {},
      searchSet: [],
      backpack: [],
      savedSets: {},
      loadouts: {}
    };

    const parsed = JSON.parse(saved);

    return {
      ...parsed,
      activeSet: parsed.activeSet ?? [],
      activeLoadout: parsed.activeLoadout ?? {},
      searchSet: parsed.searchSet ?? [],
      backpack: parsed.backpack ?? [],
      savedSets: parsed.savedSets ?? {},
      loadouts: parsed.loadouts ?? {}
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

      const sortedMap = new Map(
        [...newMap.entries()].sort(([, card], [, card2]) => card.cardIDs[0].localeCompare(card2.cardIDs[0], undefined, {
      numeric: true}))
      )

      return changed ? sortedMap : prev;
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
  
  function checkNames(origName, saveGroup, name = origName, i = 1) {
    if (name in saveGroup) {
      return checkNames(origName, saveGroup, origName + " " + i, i + 1)
    } else {
      return name
    }
  }
  const saveSet = (name, ids) => setAppState(prev => ({
    ...prev,
    savedSets: {
      ...prev.savedSets,
      [checkNames(name, prev.savedSets)]: ids
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

  const addCardToSet = (setName, cardID) => setAppState(prev => ({
    ...prev,
    savedSets: {
      ...prev.savedSets,
      [setName]: [...new Set([...prev.savedSets[setName], cardID])]
    }
  }));

  const removeCardFromSet = (setName, cardID) => setAppState(prev => ({
    ...prev,
    savedSets: {
      ...prev.savedSets,
      [setName]: prev.savedSets[setName].filter(c => c !== cardID)
    }
  }));

  function setSlot(slotName, cardID, loadoutName = null) {
    if (loadoutName) {
      setAppState(prev => ({
        ...prev,
        loadouts: {
          ...prev.loadouts,
          [loadoutName]: {
            ...prev.loadouts[loadoutName],
            [slotName]: cardID}
        }
      }))

      return
    }

    setAppState(prev => ({
      ...prev,
      activeLoadout: {
        ...prev.activeLoadout,
        [slotName]: cardID
      }
    }))
  }

  function loadLoadout(loadoutName) {
    setAppState(prev => ({
      ...prev,
      activeLoadout: prev.loadouts[loadoutName]
    }))
  }

  function saveLoadout(loadoutName, slotsList) {
    setAppState(prev => ({
      ...prev,
      loadouts: {
        ...prev.loadouts,
        [checkNames(loadoutName, prev.loadouts)]: slotsList
      }
    }))
  }

  const deleteLoadout = (loadoutname) => setAppState(prev => {
    const newLoadouts = { ...prev.loadouts };
    delete newLoadouts[loadoutname];

    return {
      ...prev,
      loadouts: newLoadouts
    };
  });

  function newEmptyLoadout() {
    saveLoadout(checkNames("New Loadout", appState.loadouts), 
      {
        Armor0: null,
        Attachment0: null,
        Attachment1: null,
        Attachment2: null,
        "Fated Mnemos0": null,
        "Fated Mnemos1": null,
        Mnemos0: null,
        Mnemos1: null,
        OneHanded0: null,
        OneHanded1: null,
        Support0: null,
        Support1: null,
        Titan: null
      }
    )
  }

  function renameLoadout(oldName, newName) {
    if (!(oldName in appState.loadouts)) return
    setAppState(prev => {
      const newLoadouts = { ...prev.loadouts };
      delete newLoadouts[oldName];

      return {
        ...prev,
        loadouts: {
          ...newLoadouts,
          [checkNames(newName, prev.loadouts)]: prev.loadouts[oldName]
        }
      }
    })
  }

  return (
    <LocalStorageContext.Provider 
      value={{ 
        appState, cardCache,
        ingestCards,
        addToBackpack, removeFromBackpack, addToActiveSet, removeFromActiveSet, clearActiveSet, 
        saveSet, loadSet, deleteSet, addCardToSet, removeCardFromSet,
        updateSearchSet,
        setSlot, loadLoadout, saveLoadout, newEmptyLoadout, deleteLoadout, renameLoadout
      }}>
      {children}
    </LocalStorageContext.Provider>
  );
}

export const useLocalStorage = () => useContext(LocalStorageContext);