import { useState } from "react";
import HamburgerButton from "../utils/HamburgerButton";
import SavedSets from "../savedsets/SavedSets";
import { useBackpackContext } from "../../context/BackpackContext";
import getIcon from "../utils/iconUtils";

const BackpackTabSelector = () => {
  const { views, activeView, setActiveView } = useBackpackContext()

  return <div className="backpack-tab-selector">
    {Object.keys(views).length > 0 && Object.keys(views).map((view, i) => (
      <button
        key={i}
        onClick={() => setActiveView(view)}
        disabled={activeView === view}
      >
        {getIcon({ name: view, invert: true })}</button>
    ))}
  </div>
}

export const BackpackLayoutTopbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return <>
    <BackpackTabSelector />

    <div className="top-menu">
      <div className="backpack__setslist-sidebar__button">
        <HamburgerButton clickFunc={() => setSidebarOpen(!sidebarOpen)}/>
          
        {sidebarOpen && <div className="backpack__setslist-sidebar">
          <SavedSets />
        </div>}
      </div>
    </div>
  </>
}