import { useEffect } from "react";
import { useBackpackContext } from "../../context/BackpackContext";
import { useLayout } from "../../context/LayoutContext";
import SavedSets from "../savedsets/SavedSets";
import { BackpackLayoutTopbar } from "./BackpackLayout";

import BackpackCardList from "./BackpackCardList";
import Deck from "../deck/Deck";
import Loadout from "../loadout/Loadout";

const Backpack = ({}) => {
  const { setLayout } = useLayout();
  const { activeView } = useBackpackContext();

  const views = {
    "Backpack": BackpackCardList,
    "Deck": Deck,
    "LoadoutBuilder": Loadout
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