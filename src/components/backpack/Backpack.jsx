import { useEffect } from "react";
import { useBackpackContext } from "../../context/BackpackContext";
import { useLayout } from "../../context/LayoutContext";
import SavedSets from "../savedsets/SavedSets";
import { BackpackLayoutTopbar } from "./BackpackLayout";
import { LoadoutProvider } from "../../context/LoadoutContext";

const Backpack = ({}) => {
  const { setLayout } = useLayout();
  const { views, activeView } = useBackpackContext();
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
        <LoadoutProvider>
          <View />
        </LoadoutProvider>
      </div>
    </div>
  </div>
}

export default Backpack