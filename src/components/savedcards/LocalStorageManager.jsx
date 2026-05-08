import { useLocalStorage } from "../../context/LocalStorageContext";
import { useEffect } from "react";

const fetchCardsByIds = async (cardIDsList) => {
  const searchString = "id:" + cardIDsList.join("||id:")

  const apiBase = import.meta.env.PROD
    ? import.meta.env.VITE_API_BASE_URL
    : '';
  const apiUrl = `${apiBase}/api/cards/?q=${searchString}&limit=5000`;    

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error fetching card:", e);
  }
};

const LocalStorageManager = ({}) => {
  const { appState, cardCache, ingestCards } = useLocalStorage()

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(appState));
  }, [appState]);

  useEffect(() => {
    async function hydrate() {
      const appStateRaw = localStorage.getItem("appState");
      const appState = appStateRaw ? JSON.parse(appStateRaw) : [];

      const missingBackpack = appState.backpack?.filter(id => !cardCache.has(id));
      const missingSets = Object.keys(appState.savedSets).flatMap((set) => appState.savedSets[set]).filter(id => !cardCache.has(id));
      const missing = [...new Set([...missingBackpack, ...missingSets])]

      if (missing.length === 0) return;

      const data = await fetchCardsByIds(missing);
      ingestCards(data.cards)
    }

    hydrate();
  }, []);
}

export default LocalStorageManager;