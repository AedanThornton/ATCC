import { useEffect } from "react";
import { useWorkspaceContext } from "./hooks/WorkspaceContext";
import { useLayout } from "../../layout/LayoutContext";
import SavedSets from "../../savedsets/SavedSets";
import { WorkspaceLayoutTopbar } from "./components/WorkspaceLayout";
import "./Workspace.css"

import Deck from "../deck/Deck";
import Loadout from "../loadout/Loadout";
import Compare from "../compare/Compare"

const Workspace = ({}) => {
  const { setLayout } = useLayout();
  const { activeView } = useWorkspaceContext();

  const views = {
    "Deck": Deck,
    "LoadoutBuilder": Loadout,
    "Compare": Compare
  };
  const View = views[activeView];

  useEffect(()=> {
    setLayout({
      main: null,
      topbar: <WorkspaceLayoutTopbar />
    })
  }, [])

  return <div className="workspace">
    <div className="workspace__main">
      <SavedSets />
      <div className="workspace__view-window">
        <View />
      </div>
    </div>
  </div>
}

export default Workspace