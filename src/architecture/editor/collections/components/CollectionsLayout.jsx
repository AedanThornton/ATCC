import { useCollectionsContext } from "../hooks/CollectionsContext";
import getIcon from "../../../../components/utils/iconUtils";

const CollectionsTabSelector = () => {
  const { activeView, setActiveView } = useCollectionsContext()

  const views = [
    "Backpack",
    "Deck",
    "LoadoutBuilder",
    // "Compare",
    // "Simulator",
  ];

  return <div className="collections-tab-selector">
    {views.length > 0 && views.map((view, i) => (
      <button
        key={i}
        onClick={() => setActiveView(view)}
        disabled={activeView === view}
      >
        {getIcon({ name: view, invert: true })}</button>
    ))}
  </div>
}

export const CollectionsLayoutTopbar = () => {

  return <>
    <CollectionsTabSelector />

    <div className="top-menu">

    </div>
  </>
}