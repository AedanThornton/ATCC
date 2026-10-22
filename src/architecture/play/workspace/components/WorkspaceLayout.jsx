import { useWorkspaceContext } from "../hooks/WorkspaceContext";
import getIcon from "../../../../components/utils/iconUtils";

const WorkspaceTabSelector = () => {
  const { activeView, setActiveView } = useWorkspaceContext()

  const views = [
    "Deck",
    "LoadoutBuilder",
    "Compare",
    // "Simulator",
  ];

  return <div className="workspace-tab-selector">
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

export const WorkspaceLayoutTopbar = () => {

  return <>
    <WorkspaceTabSelector />

    <div className="top-menu">

    </div>
  </>
}