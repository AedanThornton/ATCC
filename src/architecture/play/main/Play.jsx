import { useEffect } from "react";
import { usePlayContext } from "./hooks/PlayContext";
import { useLayout } from "../../layout/LayoutContext";
import Collections from "../../collections/Collections";
import { PlayLayoutTopbar } from "./components/PlayLayout";
import "./Play.css"

import Deck from "../deck/Deck";
import Loadout from "../loadout/Loadout";
import Compare from "../compare/Compare"

const Play = ({}) => {
  const { setLayout } = useLayout();
  const { activeView } = usePlayContext();

  const views = {
    "Deck": Deck,
    "LoadoutBuilder": Loadout,
    "Compare": Compare
  };
  const View = views[activeView];

  useEffect(()=> {
    setLayout({
      main: null,
      topbar: <PlayLayoutTopbar />
    })
  }, [])

  return <div className="play">
    <div className="play__main">
      <Collections />
      <div className="play__view-window">
        <View />
      </div>
    </div>
  </div>
}

export default Play