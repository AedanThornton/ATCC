import { useBackpackContext } from "../../context/BackpackContext";

const Backpack = ({}) => {
  const { views, activeView } = useBackpackContext();
  const View = views[activeView];

  return <div className="backpack">
    <div className="backpack__main">
      <div className="backpack__view-window">
        <View />
      </div>
    </div>
  </div>
}

export default Backpack