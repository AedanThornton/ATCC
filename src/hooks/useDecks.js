import { useState, useEffect } from 'react';
import { useLocalStorage } from '../context/LocalStorageContext';

export function useDecks(searchParams) {
  const [deckCards, setDeckCards] = useState([]);
  const [primordialOptions, setPrimordialOptions] = useState([]);
  const [otherCardPools, setOtherCardPools] = useState([]);

  //Function states
  const [isLoading, setIsLoading] = useState(true); // Start loading initially
  const [error, setError] = useState(null);

  const { ingestCards } = useLocalStorage();

  useEffect(() => {
    console.log(searchParams)
    if (!(
      !searchParams ||
      (searchParams.get("type") !== "" && searchParams.get("name") === "" && searchParams.get("variant") === "") || 
      (searchParams.get("type") !== "" && searchParams.get("name") !== "" && searchParams.get("variant") !== "")
    )) { 
      return //don't fetch data except when 1. only "type" is selected (to get primordial list) or 2. everything is selected
    }

    const fetchDeck = async () => {
      setIsLoading(true);
      setError(null);

      const apiBase = import.meta.env.PROD
        ? import.meta.env.VITE_API_BASE_URL
        : '';
      const apiUrl = `${apiBase}/api/decks?${searchParams.toString()}`;         

      try {
          const response = await fetch(apiUrl);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          
          setDeckCards(data.deck);
          ingestCards(data.deck);
          setPrimordialOptions(data.primordialOptions);
          setOtherCardPools(data.otherCardPools);
          data.otherCardPools.map(pool => {
            ingestCards(pool.cards)
          })
      } catch (e) {
          console.error("Error fetching deck:", e);
          setError(e.message);
          setDeckCards([]);
          setOtherCardPools([]);
        } finally {
          setIsLoading(false); // Set loading false when fetch finishes (success or error)
      }
    };

    fetchDeck();
  }, [searchParams]);

  return { deckCards, primordialOptions, otherCardPools, isLoading, error }
}