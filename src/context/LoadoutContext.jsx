import { createContext, useContext, useState } from "react";

const LoadoutContext = createContext();

export function LoadoutProvider({ children }) {
  const [bannedHandTypes, setBannedHandTypes] = useState([])
  const [handSlots, setHandSlots] = useState(2);
  const [supportSlots, setSupportSlots] = useState(2);

  function addHandSlot() {
    if (handSlots <= 5) setHandSlots(handSlots + 1)
  }

  function addSupportSlot() {
    if (supportSlots <= 5) setSupportSlots(supportSlots + 1)
  }

  const vars = {
    handSlots, setHandSlots,
    supportSlots, setSupportSlots,
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