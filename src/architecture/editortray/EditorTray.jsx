import { useEditorTrayContext } from "./hooks/EditorTrayContext"
import "./editortray.css"
import Editor from "../editor/editor/Editor";
import { createPortal } from "react-dom";
import Collections from "../collections/Collections";
import getIcon from "../../components/utils/iconUtils";
import { useEffect, useState } from "react";

function EditorTray({}) {
  const { openEditors, activeEditor, setActiveEditor, closeEditor } = useEditorTrayContext()
  const [trayOpen, setTrayOpen] = useState(false)

  useEffect(() => {
    const openEditorNames = Object.keys(openEditors)
    if (openEditorNames.length > 0) setActiveEditor(openEditorNames[openEditorNames.length - 1])
    setTrayOpen(true)
  }, [openEditors])

  if (Object.keys(openEditors).length < 1) return null;

  return createPortal(<div className={"editortray" + (trayOpen ? "" : " minimized")}>
    <div className="editortray-controls" onClick={() => setTrayOpen(!trayOpen)}>
      <div></div>

      <h3>Editor</h3>

      <div className="editortray-controls-group">
        {trayOpen && <button onClick={(e) => {e.stopPropagation(); setTrayOpen(!trayOpen)}}>—</button>}
        {trayOpen && <button onClick={(e) => {e.stopPropagation(); }}>{getIcon({name: "X", invert: true, size: "0.8em"})}</button>}
      </div>
    </div>

    <div className="editortray-tabs">
      {Object.keys(openEditors).map((editor, i) =>
        <div className={"editortray-tab" + (activeEditor === editor ? " selected" : " inactive")}>  
          <button key={i} className="editortray-tab-button"
            onClick={() => setActiveEditor(editor)}
            disabled={activeEditor === editor}
          >
            {editor}
          </button>
          <button className="editortray-tab-close"
            onClick={() => closeEditor(editor)}
          >
            {getIcon({name: "X", invert: true})}
          </button>
        </div>
      )}
    </div>

    <div className="editortray-editing-window">
      <Collections />
      {activeEditor && <Editor collectionType={openEditors[activeEditor]} />}
    </div>
  </div>,
  document.getElementById('root'))
}

export default EditorTray