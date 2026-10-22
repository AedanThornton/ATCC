import { useState } from "react";
import getIcon from "../../../components/utils/iconUtils";

const CollectionsMenu = ({ options }) => {
  const [showSetMenu, setShowSetMenu] = useState(false)

  return (<div style={{ position: "relative"}} onMouseLeave={() => setShowSetMenu(false)}>
    <span className="collections-button" onMouseEnter={() => setShowSetMenu(true)}>
      {getIcon({name: "Options", invert: true})}
    </span>

    {showSetMenu && <div className="collections-menu">
      {options.map((option, i) => (
        <div key={i} className="collections-menu__options" onClick={(e) => {e.stopPropagation(); option.func(); setShowSetMenu(false)}}>{option.title}</div>
      ))}
    </div>}
  </div>)
}

export default CollectionsMenu;