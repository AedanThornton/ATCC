import { useEffect } from "react";
import { useBackpackContext } from "./hooks/CollectionsContext";
import { useLayout } from "../../layout/LayoutContext";
import SavedSets from "../../savedsets/SavedSets";
import { BackpackLayoutTopbar } from "./components/CollectionsLayout";

import BackpackCardList from "./components/CollectionsCardList";
import Deck from "../../play/deck/Deck";
import Loadout from "../loadout/Loadout";
import Compare from "../../play/compare/Compare";

const Backpack = ({}) => {
  const { setLayout } = useLayout();
  const { activeView } = useBackpackContext();

  const views = {
    "Backpack": BackpackCardList,
    "Deck": Deck,
    "LoadoutBuilder": Loadout,
    // "Compare": Compare,
    // "Simulator": <div style={{height: "1000px"}}>Simulator</div>,
  };
  const View = views[activeView];

  useEffect(()=> {
    setLayout({
      main: null,
      topbar: <BackpackLayoutTopbar />
    })
  }, [])

  return <div className="backpack">
    <div className="backpack__main">
      <SavedSets />
      <div className="backpack__view-window">
        <View />
      </div>
    </div>
  </div>
}

export default Backpack