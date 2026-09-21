import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "./LocalStorageContext";

const LoadoutContext = createContext();

export function LoadoutProvider({ children }) {
  const { appState, addSlotToActiveLoadout, removeSlotFromActiveLoadout, setSlot } = useLocalStorage();
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

  function removeSlotFromActive(type, index) {
    function rotateDown (range) {
      console.log(range - 1, index)
      if (range - 1 - index < 0) return

      Array(range - 1 - index).fill("").map((_, i) => {
        console.log(type + `${index + i}`, appState.activeLoadout[type + `${index + i + 1}`])
        setSlot(type + `${index + i}`, appState.activeLoadout[type + `${index + i + 1}`])
      })
      console.log(type + `${index + 1}`)
      removeSlotFromActiveLoadout(type + `${index + 1}`)
    }

    if (type === "OneHanded") {
      rotateDown(handSlots)
    } else if (type === "Support") {
      rotateDown(supportSlots)
    } else {
      console.error("Error: Non-removeable slot type attempted to be removed")
    }
  }


  const vars = {
    handSlots, supportSlots,
    bannedHandTypes, setBannedHandTypes,
    addHandSlot, addSupportSlot,
    removeSlotFromActive
  }

  return (
    <LoadoutContext.Provider value={vars}>
      {children}
    </LoadoutContext.Provider>
  );
}

export const useLoadout = () => useContext(LoadoutContext);