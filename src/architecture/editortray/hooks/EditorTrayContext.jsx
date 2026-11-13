import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../../../management/localstorage/LocalStorageContext";

const EditorTrayContext = createContext();

export function EditorTrayProvider({ children }) {
  const { loadSet, loadLoadout } = useLocalStorage();

  const [openEditors, setOpenEditors] = useState({});
  const [activeEditor, setActiveEditor] = useState(null);

  function getCollectionLoader(editorType){
    const collectionLoaders = {
      "set": loadSet,
      //"deck": loadDeck,
      "loadout": loadLoadout,
    };
    const empty = ()=>{}

    return collectionLoaders[editorType] || empty
  }

  useEffect(() => {
    if (!activeEditor) return
    const loader = getCollectionLoader(activeEditor.type);
    loader(activeEditor.name)
  }, [activeEditor])

  function openNewEditor(collectionType, collectionName) {
    setOpenEditors(prev => ({
      ...prev,
      [collectionName]: collectionType
    }))
  }

  function closeEditor(collectionName) {
    const openEditorNames = Object.keys(openEditors)
    const editorIndex = openEditorNames.indexOf(collectionName)
    if (editorIndex === -1) return

    if (openEditorNames.length > 1) {
      if (editorIndex === 0) setActiveEditor(openEditorNames[1])
      else setActiveEditor(openEditorNames[editorIndex - 1])
    } else {
      setActiveEditor(null)
    }

    setOpenEditors(prev => {
      const newEditorData = { ...prev };
      delete newEditorData[collectionName];
      return newEditorData
    })
  }

  const values = {
    activeEditor, setActiveEditor,
    openEditors, setOpenEditors,
    openNewEditor, closeEditor
  }

  return (
    <EditorTrayContext.Provider value={values}>
      {children}
    </EditorTrayContext.Provider>
  );
}

export function useEditorTrayContext() {
  const context = useContext(EditorTrayContext);

  if (!context) {
    throw new Error("useEditorTrayContext must be used within EditorTrayProvider");
  }

  return context;
}