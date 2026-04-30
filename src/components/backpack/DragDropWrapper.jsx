import { DragDropProvider } from "@dnd-kit/react";
import Backpack from "./Backpack";
import { useContext, useEffect, useRef, useState } from "react";
import CardRenderer from "../cards/CardRenderer";
import { AutoScroller } from "@dnd-kit/dom";
import { useLocalStorage } from "../../context/LocalStorageContext";

const DragDropWrapper = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { backpack, addToBackpack, removeFromBackpack } = useLocalStorage()
  const backpackRef = useRef(null);

  function handleBackpackChange(event) {
    if (event.canceled) return;

    const container = backpackRef.current;
    const scrollLeft = container?.scrollLeft;

    const id = event.operation.source?.id;

    if (!id.endsWith("backpack") && event.operation.target?.id === "backpack" && backpack.includes(id)) return;
    if (!id.endsWith("backpack") && event.operation.target?.id === "backpack") addToBackpack(id);
    if (id.endsWith("backpack") && event.operation.target?.id !== "backpack") removeFromBackpack(id);

    requestAnimationFrame(() => {
      if (container) container.scrollLeft = scrollLeft;
    });
  }

  return (
    <DragDropProvider
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event) => {
        handleBackpackChange(event)
        setIsDragging(false)
      }}
      plugins={(defaults) =>
        defaults.filter((plugin) => plugin !== AutoScroller)
      }
    >
      {children}
      <div className={isDragging ? "drag-backpack-overlay backpack-open" : "drag-backpack-overlay" }></div>
      <Backpack isDragging={isDragging} />
    </DragDropProvider>
  )
}

export default DragDropWrapper