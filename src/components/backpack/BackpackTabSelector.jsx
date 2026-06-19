import getIcon from "../utils/iconUtils"

const BackpackTabSelector = ({ views, activeView, setActiveView }) => {
  return <div className="backpack-tab-selector">
    {views && views.length > 0 && views.map((view, i) => (
      <button
        key={i}
        onClick={() => setActiveView(view)}
        disabled={activeView === view}
      >
        {getIcon({ name: view, invert: true })}</button>
    ))}
  </div>
}

export default BackpackTabSelector;