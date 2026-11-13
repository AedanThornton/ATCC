import { useEffect } from "react";
import { useCollectionsContext } from "../../collections/hooks/CollectionsContext";
import Collections from "../../collections/Collections";
import { useWorkspaceContext } from "./hooks/WorkspaceContext";
import "./Workspace.css"
import { useLayout } from "../../layout/LayoutContext";
import Editor from "../editor/Editor";

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

  return <div className="workspace">
    <div className="workspace__main">
      <Collections />
      <div className="workspace__view-window">
        <Editor collectionType={activeView} />
      </div>
    </div>
  </div>
}

export default Workspace