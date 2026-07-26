import { useState } from "react";
import getIcon from "../utils/iconUtils";

const SavedSetsMenu = ({ options }) => {
  const [showSetMenu, setShowSetMenu] = useState(false)

  return (<div style={{ position: "relative"}} onMouseLeave={() => setShowSetMenu(false)}>
    <span className="saved-sets-button" onMouseEnter={() => setShowSetMenu(true)}>
      {getIcon({name: "Options", invert: true})}
    </span>

    {showSetMenu && <div className="saved-sets-menu">
      {options.map((option, i) => (
        <div key={i} className="saved-sets-menu__options" onClick={(e) => {e.stopPropagation(); option.func(); setShowSetMenu(false)}}>{option.title}</div>
      ))}
    </div>}
  </div>)
}

export default SavedSetsMenu;