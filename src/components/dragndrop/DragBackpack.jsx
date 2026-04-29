import { useDroppable } from "@dnd-kit/react"
import "./dragBackpack.css"
import BackpackMenu from "./BackpackMenu";
import { useRef, useState } from "react";
import getIcon from "../utils/iconUtils";

const DragBackpack = ({ children, isDragging }) => {
  const [searchTermUI, setSearchTermUI] = useState("");
  const { ref, isDropTarget } = useDroppable({ id: "backpack" });
  const backpackSearchRef = useRef(null);

  return <div className={`backpack-wrapper ${isDropTarget ? "is-drop-target" : ""} ${isDragging ? "backpack-open" : ""}`}>
    <div ref={ref} className={`drag-backpack`}>
      {children}
    </div>
    <div className="backpack-search-bar-wrapper">
      <input
        type="text"
        ref={backpackSearchRef}
        placeholder="Stored Cards"
        value={searchTermUI}
        onChange={(e) => setSearchTermUI(e.target.value)}
        className="backpack-search-bar"
      />
      <button onClick={() => backpackSearchRef.current?.focus()}>{getIcon({ name: "DaedalusWorkshop", invert: true })}</button>
    </div>
    <BackpackMenu setName={searchTermUI} />
  </div>
}

export default DragBackpack