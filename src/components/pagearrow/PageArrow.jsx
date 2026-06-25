import { useDroppable } from "@dnd-kit/react";
import "./pagearrow.css"

const PageArrow = ({ isDragging, icon, funcTrigger = ()=>{}, variant }) => {
  const { ref, isDropTarget } = useDroppable({ id: variant });

  const options = {
    "backpack": "backpack-arrow",
    "catalog": "catalog-arrow"
  }

  return <div ref={ref} className={`${options[variant]} page-over ${isDropTarget ? "is-drop-target" : ""} ${(isDragging) ? "open" : ""}`}>
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