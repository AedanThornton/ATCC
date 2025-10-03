import { useState, useEffect } from 'react';

export function useCards(searchParams) {
  const [filteredCards, setFilteredCards] = useState([]);

  //Page states
  const [totalPages, setTotalPages] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  //Function states
  const [isLoading, setIsLoading] = useState(true); // Start loading initially
  const [error, setError] = useState(null);

  // --- Effect to Fetch Data (Depends on Filters) ---
  // This runs on mount AND whenever filter state changes
  useEffect(() => {
    if (!searchParams.has("p") || !searchParams.has("s")) { return; }

    // --- API Fetching Function (using useCallback) ---
    const fetchCards = async () => {
      setIsLoading(true);
      setError(null);

      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/api/cards?${searchParams.toString()}`;            

      try {
          const response = await fetch(apiUrl);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          
          setFilteredCards(data.cards);
          setTotalCards(parseInt(data.totalCards));
          setTotalPages(parseInt(data.totalPages));
      } catch (e) {
          console.error("Error fetching cards:", e);
          setError(e.message);
          setFilteredCards([]);
      } finally {
          setIsLoading(false); // Set loading false when fetch finishes (success or error)
      }
    };

    console.log("Filters changed or initial load done, fetching data...");
    fetchCards();
  }, [searchParams]);

  return { filteredCards, totalPages, totalCards, isLoading, error }
}