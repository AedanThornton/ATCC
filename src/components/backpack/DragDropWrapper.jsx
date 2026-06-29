import { DragDropProvider } from "@dnd-kit/react";
import { useRef } from "react";
import { AutoScroller } from "@dnd-kit/dom";
import { useBackpackContext } from "../../context/BackpackContext";

const DragDropWrapper = ({ children }) => {
  const { backpackPreviewOpen, setBackpackPreviewOpen, handleAddToBackpack, handleRemoveFromBackpack } = useBackpackContext()
  const backpackRef = useRef(null);

  function handleBackpackChange(event) {
    if (event.canceled) return;

    const container = backpackRef.current;
    const scrollLeft = container?.scrollLeft;

    const id = event.operation.source?.id;

    const handler = event.operation.target?.data.onDrop
    handler?.(id)

    //these function the same as the above two lines, but are here to prevent needlessly jumping from here to PageArrow and back again, and to keep PageArrow dynamic
    if (event.operation.target?.id === "backpack-arrow") handleAddToBackpack(id);
    if (event.operation.target?.id === "catalog-arrow") handleRemoveFromBackpack(id);

    requestAnimationFrame(() => {
      if (container) container.scrollLeft = scrollLeft;
    });
  }

  return (
    <DragDropProvider
      onDragStart={() => setBackpackPreviewOpen(true)}
      onDragEnd={(event) => {
        handleBackpackChange(event)
        setBackpackPreviewOpen(false)
      }}
      plugins={(defaults) =>
        defaults.filter((plugin) => plugin !== AutoScroller)
      }
    >
      {children}
      <div className={backpackPreviewOpen ? "drag-backpack-overlay backpack-open" : "drag-backpack-overlay"}></div>

    </DragDropProvider>
  )
}

export default DragDropWrapper