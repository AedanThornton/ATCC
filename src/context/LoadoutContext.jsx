import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "./LocalStorageContext";

const LoadoutContext = createContext();

export function LoadoutProvider({ children }) {
  const { appState, addSlotToActiveLoadout } = useLocalStorage();
  const [bannedHandTypes, setBannedHandTypes] = useState([]);

  const handSlots = Object.keys(appState.activeLoadout).filter(key => key.includes("OneHanded")).length
  const supportSlots = Object.keys(appState.activeLoadout).filter(key => key.includes("Support")).length

  function addHandSlot() {
    if (handSlots >= 5) return
    
    addSlotToActiveLoadout(`OneHanded${handSlots}`)
  }

  function addSupportSlot() {
    if (supportSlots >= 5) return
      
    addSlotToActiveLoadout(`Support${supportSlots}`)
  }

  const vars = {
    handSlots, supportSlots,
    bannedHandTypes, setBannedHandTypes,
    addHandSlot, addSupportSlot
  }

  return (
    <LoadoutContext.Provider value={vars}>
      {children}
    </LoadoutContext.Provider>
  );
}

export const useLoadout = () => useContext(LoadoutContext);