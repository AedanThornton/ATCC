import getIcon from "../utils/iconUtils"

const BackpackTabSelector = ({ showBackpack, views, activeView, setActiveView }) => {
  return <div className={`backpack-tab-selector ${showBackpack ? "backpack-open" : ""}`}>
    {views && views.length > 0 && views.map(view => (
      <button
        onClick={() => setActiveView(view)}
        disabled={activeView === view}
      >
        {getIcon({ name: view, invert: true })}</button>
    ))}
  </div>
}

export default BackpackTabSelector;