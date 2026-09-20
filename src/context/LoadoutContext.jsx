import { createContext, useContext, useState } from "react";

const LoadoutContext = createContext();

export function LoadoutProvider({ children }) {
  const [bannedHandTypes, setBannedHandTypes] = useState([])
  const [handSlots, setHandSlots] = useState(2);

  function addHandSlot() {
    if (handSlots <= 5) setHandSlots(handSlots + 1)
  }

  const vars = {
    handSlots, setHandSlots,
    bannedHandTypes, setBannedHandTypes,
    addHandSlot
  }

  return (
    <LoadoutContext.Provider value={vars}>
      {children}
    </LoadoutContext.Provider>
  );
}

export const useLoadout = () => useContext(LoadoutContext);