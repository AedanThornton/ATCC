import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "../context/LocalStorageContext";

export function useAllCards() {
  const { ingestCards } = useLocalStorage();
  
  return useQuery({
    queryKey: ["cards", "all"],
    queryFn: async () => {
      const res = await fetch("/api/cards/all");
      if (!res.ok) throw new Error("Failed to fetch cards");
      
      const data = await res.json();
      ingestCards(data.cards);
      return data;
    },
    staleTime: Infinity
  });
}