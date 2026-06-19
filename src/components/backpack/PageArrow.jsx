import { useDroppable } from "@dnd-kit/react";
import "./pagearrow.css"

const PageArrow = ({ isDragging, icon, funcTrigger = ()=>{} }) => {
  const { ref, isDropTarget } = useDroppable({ id: "backpack" });

  return <div ref={ref} className={`page-over ${isDropTarget ? "is-drop-target" : ""} ${(isDragging) ? "open" : ""}`}>
    <div className="page-over-arrow">
      <div
        className="page-over-arrow-button"
        onClick={() => funcTrigger()}
      >
        {icon}
      </div>
    </div>
  </div>
}

export default PageArrow