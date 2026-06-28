import { DragDropProvider } from "@dnd-kit/react";
import PageArrow from "../pagearrow/PageArrow";
import { useRef } from "react";
import { AutoScroller } from "@dnd-kit/dom";
import getIcon from "../utils/iconUtils";
import { useBackpackContext } from "../../context/BackpackContext";

const DragDropWrapper = ({ children, subpage, setSubpage }) => {
  const { backpackPreviewOpen, setBackpackPreviewOpen, handleAddToBackpack, handleRemoveFromBackpack } = useBackpackContext()
  const backpackRef = useRef(null);

  function handleBackpackChange(event) {
    if (event.canceled) return;

    const container = backpackRef.current;
    const scrollLeft = container?.scrollLeft;

    const id = event.operation.source?.id;

    if (!id.endsWith("backpack") && event.operation.target?.id === "backpack") handleAddToBackpack(id);
    if (id.endsWith("backpack") && event.operation.target?.id === "catalog") handleRemoveFromBackpack(id);

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
      {subpage === "backpack" && <PageArrow isDragging={backpackPreviewOpen} icon={getIcon({name: "Catalog", invert: true})} funcTrigger={() => setSubpage("cardlist")} variant={"catalog"} />}
      {children}
      <div className={backpackPreviewOpen ? "drag-backpack-overlay backpack-open" : "drag-backpack-overlay" }></div>

      {subpage === "cardlist" && <PageArrow isDragging={backpackPreviewOpen} icon={getIcon({name: "Backpack", invert: true})} funcTrigger={() => setSubpage("backpack")} variant={"backpack"} />}
    </DragDropProvider>
  )
}

export default DragDropWrapper