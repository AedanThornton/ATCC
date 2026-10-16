import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "../management/localstorage/LocalStorageContext";

export function useAllCards() {
  const { ingestCards } = useLocalStorage();
  
  return useQuery({
    queryKey: ["cards", "all"],
    queryFn: async () => {
      
      const apiBase = import.meta.env.PROD
        ? import.meta.env.VITE_API_BASE_URL
        : "";

      const res = await fetch(`${apiBase}/api/cards/all`);
      if (!res.ok) throw new Error("Failed to fetch cards");
      
      const data = await res.json();
      ingestCards(data.cards);
      return data;
    },
    staleTime: Infinity
  });
}