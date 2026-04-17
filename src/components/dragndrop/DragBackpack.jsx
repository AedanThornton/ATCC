import { useDroppable } from "@dnd-kit/react"
import "../../styles/dragBackpack.css"

const DragBackpack = ({ children, isDragging }) => {
  const { ref, isDropTarget } = useDroppable({ id: "backpack" });

  return <div ref={ref} className={`drag-backpack ${isDropTarget ? "is-drop-target" : ""} ${isDragging ? "backpack-open" : ""}`}>
    {children.length < 1 && "Stored Cards"}
    {children}
  </div>
}

export default DragBackpack