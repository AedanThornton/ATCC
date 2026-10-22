import { createContext, useContext, useState } from "react";

const WorkspaceContext = createContext();

export function WorkspaceProvider({ children }) {
  const [activeView, setActiveView] = useState("Backpack");

  const values = { 
    activeView, setActiveView,
  }

  return (
    <WorkspaceContext.Provider value={values}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspaceContext() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspaceContext must be used within WorkspaceProvider");
  }

  return context;
}