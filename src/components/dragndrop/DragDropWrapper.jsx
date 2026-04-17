import { DragDropProvider } from "@dnd-kit/react";
import DragBackpack from "./DragBackpack";
import { useEffect, useRef, useState } from "react";
import CardRenderer from "../cards/CardRenderer";
import cardCache from "../../hooks/cardCache";
import { AutoScroller } from "@dnd-kit/dom";

const DragDropWrapper = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [backpackChildren, setBackpackChildren] = useState(() => {
    const saved = localStorage.getItem("backpack");
    return saved ? JSON.parse(saved) : [];
  });
  const backpackRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("backpack", JSON.stringify(backpackChildren));
  }, [backpackChildren]);

  function handleBackpackChange(event) {
    if (event.canceled) return;

    const container = backpackRef.current;
    const scrollLeft = container?.scrollLeft;

    const id = event.operation.source?.id;

    if (!id.endsWith("backpack") && event.operation.target?.id === "backpack" && backpackChildren.includes(id)) return;
    if (!id.endsWith("backpack") && event.operation.target?.id === "backpack") setBackpackChildren(prev => [...prev, id]);
    if (id.endsWith("backpack") && event.operation.target?.id !== "backpack") {
      setBackpackChildren(prev => prev.filter(cardID => cardID !== id && cardID !== id.replace("backpack", "")));
    }

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
      <DragBackpack isDragging={isDragging}>
        {backpackChildren.map((card, i) => 
          <div className="drag-backpack-item">
            <CardRenderer cardname={cardCache.get(card)} key={i} variant="backpack" />
          </div>
        )}
      </DragBackpack>
    </DragDropProvider>
  )
}

export default DragDropWrapper