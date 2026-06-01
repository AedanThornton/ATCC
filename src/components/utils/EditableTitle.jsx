import { useEffect, useRef, useState } from "react";
import "./utils.css"
import getIcon from "./iconUtils";

const EditableTitle = ({ titleID, onSave, initialName }) => {
  const [draftingName, setDraftingName] = useState("")
  const [editingID, setEditingID] = useState(null);
  const titleRef = useRef(null)

  const handleSaveName = (oldName) => {
    onSave(oldName, draftingName)
    setEditingID(null)
  }

  const handleStartEditing = (id, name) => {
    setEditingID(id)
    setDraftingName(name)
  }

  const handleSearchUpdate = (term) => {
    if (term.length > 20) {
      term = term.slice(0, 20);
    }

    setDraftingName(term);
  }

  useEffect(() => {
    if (editingID === titleID) titleRef.current?.focus()
  }, [editingID])

  return (
    <span className="editable-title">
      <span 
        className="editable-title-button"
        onClick={() => editingID === titleID ? handleSaveName(initialName) : handleStartEditing(titleID, initialName)}
      >
        {getIcon({ name: editingID === titleID ? "Check" : "Edit", invert: true })}
      </span>

      {editingID === titleID
        ? <input
            ref={titleRef}
            type="text"
            placeholder="..."
            value={draftingName}
            onChange={(e) => handleSearchUpdate(e.target.value)}
            className="editable-title-search-bar"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveName(set)
              }
            }}
          />
        : <span className="editable-title-nonediting">{initialName}</span>
      }
    </span>
  )
}

export default EditableTitle