import { useEffect, useState } from "react";


export function useFilterOptions() {
  const [filterOptions, setFilterOptions] = useState({});
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState(null);

  //On-load render
  useEffect(() => {
    const fetchOptions = async () => {
      setOptionsLoading(true);
      setOptionsError(null);

      const apiUrl = `/api/filter-options`;      

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const optionsData = await response.json();

        // --- Set the INITIAL filters state (all selected by default) ---
        setFilterOptions({
            cardType: optionsData.cardTypes || [],
            cycle: optionsData.cycles || [],
            cardSize: optionsData.cardSizes || [],
            foundIn: optionsData.foundIns.sort((a, b) => {
                const getPriority = (str) => {
                  if (str.startsWith("Secret Deck")) return 1;
                  if (str.startsWith("Envelope")) return 2;
                  return 0; // default, non-secret, non-envelope
                };

                const pa = getPriority(a);
                const pb = getPriority(b);

                if (pa !== pb) return pa - pb; // sort by category first
                return a.localeCompare(b, undefined, { numeric: true }); // then alphabetical, numeric-aware
              }) || [],
        });
      } catch (e) {
          console.error("Error fetching filter options:", e);
          setOptionsError("Could not load filter options.");
      } finally {
          setOptionsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  return { filterOptions, optionsLoading, optionsError }
}