import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/focuscardpage.css'

import cardTypes from '../lib/cardTypes';

function FocusCardPage() {
  // --- Get URL Parameter ---
  const { cardID: cardID } = useParams();

  // --- State for Card Data, Loading, Error ---
  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Data Effect ---
  useEffect(() => {
    // Function to fetch data for this specific card
    const fetchCard = async () => {
      setIsLoading(true);
      setError(null);
      setCardData(null); // Clear previous card data

      // Construct API URL using the cardID from the URL
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/api/card/${cardID}`;
      console.log(`Fetching card detail from: ${apiUrl}`);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          // Handle 404 or other errors from the API
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCardData(data); // Set the fetched card data
      } catch (e) {
        console.error("Error fetching card:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCard(); // Call the fetch function

    // Dependency array includes cardID
    // This ensures the effect re-runs if the user navigates
    // from one card detail page directly to another (e.g., via related links)
  }, [cardID]);

  // --- Render Logic ---
  if (isLoading) {
    return <div>Loading card details...</div>;
  }

  if (error) {
    // Provide a link back to the library maybe
    return (
        <div>
            Error: {error}
            <p><Link to="/catalog">Back to Catalog</Link></p>
        </div>
    );
  }

  if (!cardData) {
    // Should ideally be caught by error state, but good failsafe
    return <div>Card not found.</div>;
  }

  const currentCard = cardTypes[cardData.cardType]?.(cardData) || null;
  const secretOverlay = <>{
    (cardData.usedFor?.includes("Secret Deck") || cardData.usedFor?.includes("Envelope"))
    && <SecretOverlay text={cardData.usedFor} key={index + "cover"} />
  }</>

  const displayParts = (
    <>
      {currentCard}
      <div>
        <div className="focus-card-info-container">
          <div><strong>ID:</strong> <p>{cardData.cardIDs[0]}</p></div>
          <div><strong>Type:</strong> <p>{cardData.cardType}</p></div>
          <div><strong>Cycle:</strong> <p>{cardData.cycle}</p></div>
          <div><strong>Lore:</strong> <p>{cardData.flavor || 'N/A'}</p></div>
        </div>
        <p></p>
        {(cardData.faq || cardData.errata) && (<div className="focus-card-info-container">
          {cardData.faq && (<div><strong>FAQ:</strong> <p>{cardData.faq}</p></div>)}
          {cardData.errata && (<div><strong>Errata:</strong> <p>{cardData.errata}</p></div>)}
        </div>)}
      </div>
    </>
  )

  return (
    <div className='focus-card-page'>
      <h1>{cardData.name}</h1>
      {cardData.cardType === "Titan" ? (
        <div className='focus-card focus-big'>{displayParts}</div>
      ) : (
        <div className='focus-card focus-small'>{displayParts}</div>
      )}
      <div className='spacer'></div>
      <div className='focus-footer'>
        <hr />
        <Link to="/catalog">Back to Catalog</Link>
      </div>
    </div>
  )
}

export default FocusCardPage;