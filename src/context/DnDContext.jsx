import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "./LocalStorageContext";

const DnDContext = createContext();

export function DnDProvider({ children }) {
  const [dragObj, setDragObj] = useState(null);
  const [dragCard, setDragCard] = useState({});
  const { cardCache } = useLocalStorage();

  function handleSetDragObj(event) {
    setDragObj(event)

    const dragID = event?.operation?.source?.id
    if (!dragID) {
      setDragCard({})
      return
    }
    const idParts = dragID.split("-")
    const realID = idParts[idParts.length - 1]
    const card = cardCache.get(realID)
    setDragCard(card)
  }

  return (
    <DnDContext.Provider value={{ dragObj, setDragObj: handleSetDragObj, dragCard }}>
      {children}
    </DnDContext.Provider>
  );
}

export const useDnD = () => useContext(DnDContext);