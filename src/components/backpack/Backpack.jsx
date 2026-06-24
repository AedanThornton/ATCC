import { useBackpackContext } from "../../context/BackpackContext";

const Backpack = ({}) => {
  const { views, activeView } = useBackpackContext()

  return <div className="backpack">
    <div className="backpack__main">
      <div className="backpack__view-window">
        {views[activeView]}
      </div>
    </div>
  </div>
}

export default Backpack