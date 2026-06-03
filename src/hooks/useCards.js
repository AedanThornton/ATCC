import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "../context/LocalStorageContext";

export function useCards(searchParams) {
  const { ingestCards } = useLocalStorage();

  return useQuery({
    queryKey: ["cards", searchParams.toString()],
    queryFn: async () => {
      if (!searchParams.has("p") || !searchParams.has("s")) {
        return {
          cards: [],
          totalCards: 0,
          totalPages: 0
        };
      }

      const apiBase = import.meta.env.PROD
        ? import.meta.env.VITE_API_BASE_URL
        : "";

      const apiUrl = `${apiBase}/api/cards?${searchParams.toString()}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // optional side effect (see note below)
      ingestCards(data.cards);

      return data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5
  });
}