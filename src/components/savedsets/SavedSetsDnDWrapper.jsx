import { DragDropProvider } from "@dnd-kit/react";
import { useRef, useState } from "react";
import { AutoScroller } from "@dnd-kit/dom";
import { useLocalStorage } from "../../context/LocalStorageContext";

const SavedSetsDnDWrapper = ({ children }) => {
  const backpackRef = useRef(null);
  const { addToActiveSet } = useLocalStorage()
  const [isDragging, setIsDragging] = useState(false)

  function handleDragEvent(event) {
    if (event.canceled) return;

    const container = backpackRef.current;
    const scrollLeft = container?.scrollLeft;

    const id = event.operation.source?.id;
    const handler = event.operation.target?.data.onDrop
    handler?.(id)

    requestAnimationFrame(() => {
      if (container) container.scrollLeft = scrollLeft;
    });
  }

  return (
    <DragDropProvider
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event) => {
        handleDragEvent(event)
        setIsDragging(true)
      }}
    >
      {children}
    </DragDropProvider>
  )
}

export default SavedSetsDnDWrapper