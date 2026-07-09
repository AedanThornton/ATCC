import { useDroppable } from "@dnd-kit/react";
import "./pagearrow.css"
import { useBackpackContext } from "../../context/BackpackContext";

const PageArrow = ({ icon, funcTrigger = ()=>{}, variant }) => {
  const { ref, isDropTarget } = useDroppable({ id: variant });
  const { backpackPreviewOpen } = useBackpackContext()

  return <div ref={ref} className={`${variant} page-over ${isDropTarget ? "is-drop-target" : ""} ${(backpackPreviewOpen) ? "open" : ""}`}>
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