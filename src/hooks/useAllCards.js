import { useQuery } from "@tanstack/react-query";

export function useAllCards() {
  return useQuery({
    queryKey: ["cards", "all"],
    queryFn: async () => {
      const res = await fetch("/api/cards/all");
      if (!res.ok) throw new Error("Failed to fetch cards");
      return res.json();
    },
    staleTime: Infinity
  });
}