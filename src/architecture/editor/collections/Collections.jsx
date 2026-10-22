import { useEffect } from "react";
import { useSavedSetsContext } from "../../savedsets/hooks/SavedSetsContext";
import SavedSets from "../../savedsets/SavedSets";
import { useCollectionsContext } from "./hooks/CollectionsContext";
import SetEdit from "../set/SetEdit";
import DeckEdit from "../deck/DeckEdit";
import LoadoutEdit from "../loadout/LoadoutEdit";

const Collections = ({}) => {
  const { setSavedSetsOpen } = useSavedSetsContext();
  const { activeView } = useCollectionsContext();

  useEffect(() => {
    setSavedSetsOpen(true)
  }, [])

  const views = {
    "set": SetEdit,
    "deck": DeckEdit,
    "loadout": LoadoutEdit,
  };
  const View = views[activeView];

  return <div className="collections">
    <div className="collections__main">
      <SavedSets />
      <div className="collections__view-window">
        <View />
      </div>
    </div>
  </div>
}

export default Collections