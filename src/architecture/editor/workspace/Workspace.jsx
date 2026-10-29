import { useEffect } from "react";
import { useCollectionsContext } from "../../collections/hooks/CollectionsContext";
import Collections from "../../collections/Collections";
import { useWorkspaceContext } from "./hooks/WorkspaceContext";
import SetEdit from "../set/SetEdit";
import DeckEdit from "../deck/DeckEdit";
import LoadoutEdit from "../loadout/LoadoutEdit";
import "./Workspace.css"
import { useLayout } from "../../layout/LayoutContext";

const Workspace = ({}) => {
  const { setCollectionsOpen } = useCollectionsContext();
  const { activeView } = useWorkspaceContext();
  const { setLayout } = useLayout();

  useEffect(() => {
    setCollectionsOpen(true)

    setLayout({
      main: null,
      topbar: null
    })
  }, [])

  const views = {
    "set": SetEdit,
    "deck": DeckEdit,
    "loadout": LoadoutEdit,
  };
  const View = views[activeView];

  return <div className="workspace">
    <div className="workspace__main">
      <Collections />
      <div className="workspace__view-window">
        <View />
      </div>
    </div>
  </div>
}

export default Workspace