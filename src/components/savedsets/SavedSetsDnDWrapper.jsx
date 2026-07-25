import { DragDropProvider } from "@dnd-kit/react";
import { useRef, useState } from "react";
import { useLocalStorage } from "../../context/LocalStorageContext";
import { PointerActivationConstraints, PointerSensor } from "@dnd-kit/dom";

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
      sensors={(defaults) => [
        ...defaults.filter((sensor) => sensor !== PointerSensor),
        PointerSensor.configure({
          activationConstraints: [
            new PointerActivationConstraints.Delay({value: 300, tolerance: 10})            
          ]
        })
      ]}
    >
      {children}
    </DragDropProvider>
  )
}

export default SavedSetsDnDWrapper