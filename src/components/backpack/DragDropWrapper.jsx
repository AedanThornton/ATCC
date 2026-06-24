import { DragDropProvider } from "@dnd-kit/react";
import PageArrow from "../pagearrow/PageArrow";
import { useRef, useState } from "react";
import { AutoScroller } from "@dnd-kit/dom";
import { useLocalStorage } from "../../context/LocalStorageContext";
import getIcon from "../utils/iconUtils";

const DragDropWrapper = ({ children, subpage, setSubpage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { appState, addToBackpack, removeFromBackpack } = useLocalStorage()
  const backpackRef = useRef(null);

  function handleBackpackChange(event) {
    if (event.canceled) return;

    const container = backpackRef.current;
    const scrollLeft = container?.scrollLeft;

    const id = event.operation.source?.id;

    if (!id.endsWith("activeSet") && event.operation.target?.id === "backpack" && appState.activeSet.includes(id)) return;
    if (!id.endsWith("activeSet") && event.operation.target?.id === "backpack") addToBackpack(id);
    if (id.endsWith("activeSet") && event.operation.target?.id !== "backpack") removeFromBackpack(id);

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
      {subpage === "backpack" && <PageArrow isDragging={isDragging} icon={getIcon({name: "Catalog", invert: true})} funcTrigger={() => setSubpage("cardlist")} />}
      {children}
      <div className={isDragging ? "drag-backpack-overlay backpack-open" : "drag-backpack-overlay" }></div>

      {subpage === "cardlist" && <PageArrow isDragging={isDragging} icon={getIcon({name: "Backpack", invert: true})} funcTrigger={() => setSubpage("backpack")} />}
    </DragDropProvider>
  )
}

export default DragDropWrapper