import { DragDropProvider } from "@dnd-kit/react";
import { useRef } from "react";
import { PointerActivationConstraints, PointerSensor } from "@dnd-kit/dom";

const DnDWrapper = ({ children }) => {
  const backpackRef = useRef(null);

  function handleDragEvent(event) {
    if (event.canceled) return;

    const id = event.operation.source?.id;
    const handler = event.operation.target?.data.onDrop
    handler?.(id)

    //Prevent drag auto-scrolling side-to-side
    const container = backpackRef.current;
    const scrollLeft = container?.scrollLeft;
    requestAnimationFrame(() => {
      if (container) container.scrollLeft = scrollLeft;
    });
  }

  return (
    <DragDropProvider
      onDragStart={() => {}}
      onDragEnd={(event) => {
        handleDragEvent(event)
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
      <div className={false ? "drag-backpack-overlay backpack-open" : "drag-backpack-overlay"}></div>
    </DragDropProvider>
  )
}

export default DnDWrapper