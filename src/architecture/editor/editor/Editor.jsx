import DeckEdit from "../deck/DeckEdit";
import LoadoutEdit from "../loadout/LoadoutEdit";
import SetEdit from "../set/SetEdit";

function Editor({ collectionType }) {

  const collectionEditors = {
    "set": SetEdit,
    "deck": DeckEdit,
    "loadout": LoadoutEdit,
  };
  const CollectionEditor = collectionType in collectionEditors ? collectionEditors[collectionType] : ()=>{}

  return <CollectionEditor />
}

export default Editor