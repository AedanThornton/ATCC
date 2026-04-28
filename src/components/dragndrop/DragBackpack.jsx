import { useDroppable } from "@dnd-kit/react"
import "../../styles/dragBackpack.css"
import BackpackMenu from "./BackpackMenu";

const DragBackpack = ({ children, isDragging }) => {
  const { ref, isDropTarget } = useDroppable({ id: "backpack" });

  return <div className={`backpack-wrapper ${isDropTarget ? "is-drop-target" : ""} ${isDragging ? "backpack-open" : ""}`}>
    <div ref={ref} className={`drag-backpack`}>
      {children.length < 1 && "Stored Cards"}
      {children}
    </div>
    <BackpackMenu />
  </div>
}

export default DragBackpack