import { createContext, useContext, useState } from "react";

const SpoilerContext = createContext();

export function SpoilerProvider({ children }) {
  const [spoilersEnabled, setSpoilersEnabled] = useState(true);
  document.documentElement.dataset.spoilers = spoilersEnabled ? "on" : "off";

  return (
    <SpoilerContext.Provider value={{ spoilersEnabled, setSpoilersEnabled }}>
      {children}
    </SpoilerContext.Provider>
  );
}

export const useSpoilers = () => useContext(SpoilerContext);