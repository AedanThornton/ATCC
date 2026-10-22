import { useAnalyticsContext } from "../hooks/AnalyticsContext";
import getIcon from "../../../../components/utils/iconUtils";

const AnalyticsTabSelector = () => {
  const { activeView, setActiveView } = useAnalyticsContext()

  const views = [
    "Compare",
    // "Simulator",
  ];

  return <div className="analytics-tab-selector">
    {views.length > 0 && views.map((view, i) => (
      <button
        key={i}
        onClick={() => setActiveView(view)}
        disabled={activeView === view}
      >
        {getIcon({ name: view, invert: true })}</button>
    ))}
  </div>
}

export const AnalyticsLayoutTopbar = () => {

  return <>
    <AnalyticsTabSelector />

    <div className="top-menu">

    </div>
  </>
}