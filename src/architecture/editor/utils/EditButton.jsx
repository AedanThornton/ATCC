import getIcon from "../../../components/utils/iconUtils";
import { useEditorTrayContext } from "../../editortray/hooks/EditorTrayContext"
import "./editorutils.css"

function EditButton({collectionType, collectionName}) {
  const { openNewEditor } = useEditorTrayContext();

  return <div className="edit-button"
    onClick={() => openNewEditor(collectionType, collectionName)}
  >
    {getIcon({name: "Edit", invert: true})}
  </div>
}

export default EditButton