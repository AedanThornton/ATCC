import { useEffect } from "react";
import { useCollectionsContext } from "./hooks/CollectionsContext";
import { useLayout } from "../../layout/LayoutContext";
import SavedSets from "../../savedsets/SavedSets";
import { CollectionsLayoutTopbar } from "./components/CollectionsLayout";

import CollectionsCardList from "./components/CollectionsCardList";
import Deck from "../../play/deck/Deck";
import Loadout from "../loadout/Loadout";
import Compare from "../../play/compare/Compare";

const Collections = ({}) => {
  const { setLayout } = useLayout();
  const { activeView } = useCollectionsContext();

  const views = {
    "Backpack": CollectionsCardList,
    "Deck": Deck,
    "LoadoutBuilder": Loadout,
    // "Compare": Compare,
    // "Simulator": <div style={{height: "1000px"}}>Simulator</div>,
  };
  const View = views[activeView];

  useEffect(()=> {
    setLayout({
      main: null,
      topbar: <CollectionsLayoutTopbar />
    })
  }, [])

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