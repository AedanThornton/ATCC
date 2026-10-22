import { createContext, useContext, useState } from "react";

const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {
  const [activeView, setActiveView] = useState("Compare");

  const values = { 
    activeView, setActiveView,
  }

  return (
    <AnalyticsContext.Provider value={values}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error("useAnalyticsContext must be used within AnalyticsProvider");
  }

  return context;
}