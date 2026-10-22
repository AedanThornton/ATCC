import { usePlayContext } from "../hooks/PlayContext";
import getIcon from "../../../../components/utils/iconUtils";

const PlayTabSelector = () => {
  const { activeView, setActiveView } = usePlayContext()

  const views = [
    "Deck",
    "LoadoutBuilder",
    // "Simulator",
  ];

  return <div className="play-tab-selector">
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

export const PlayLayoutTopbar = () => {

  return <>
    <PlayTabSelector />

    <div className="top-menu">

    </div>
  </>
}