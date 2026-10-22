import { useEffect } from "react";
import { useAnalyticsContext } from "./hooks/AnalyticsContext";
import { useLayout } from "../../layout/LayoutContext";
import Collections from "../../collections/Collections";
import { AnalyticsLayoutTopbar } from "./components/AnalyticsLayout";
import "./Analytics.css"

import Compare from "../compare/Compare"

const Analytics = ({}) => {
  const { setLayout } = useLayout();
  const { activeView } = useAnalyticsContext();

  const views = {
    "Compare": Compare
  };
  const View = views[activeView];

  useEffect(()=> {
    setLayout({
      main: null,
      topbar: <AnalyticsLayoutTopbar />
    })
  }, [])

  return <div className="analytics">
    <div className="analytics__main">
      <Collections />
      <div className="analytics__view-window">
        <View />
      </div>
    </div>
  </div>
}

export default Analytics