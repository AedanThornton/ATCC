import { createContext, useContext, useState } from "react";

const CollectionsContext = createContext();

export function CollectionsProvider({ children }) {
  const [activeView, setActiveView] = useState("set");

  const values = { 
    activeView, setActiveView
  }

  return (
    <CollectionsContext.Provider value={values}>
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollectionsContext() {
  const context = useContext(CollectionsContext);

  if (!context) {
    throw new Error("useCollectionsContext must be used within CollectionsProvider");
  }

  return context;
}