import SecretOverlay from "./utils/SecretOverlay";
import { useState, useEffect, Children } from "react";
import FocusCard from "./FocusCard";
import { createPortal } from "react-dom";
import getIcon from "./utils/iconUtils";

const FocusCardOverlay = ({ cardID, children }) => {
  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isHidden, setIsHidden] = useState(true);
  const [currentSide, setCurrentSide] = useState(1);
  const [focusDisplay, setFocusDisplay] = useState(false);

  // --- Fetch data and show overlay ---
  const handleFetchAndDisplay = async () => {
    setFocusDisplay(true);

    // If we've already fetched this card's data, don't fetch it again
    if (cardData && cardData.id === cardID) {
      console.log("Card data already loaded.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setCardData(null); // Clear previous card data

    const apiUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/api/card/${cardID}`;
    console.log(`Fetching card detail from: ${apiUrl}`);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCardData(data);

      const isSecretCard = cardData?.foundIn?.includes("Secret Deck") || cardData?.foundIn?.includes("Envelope") || cardData?.foundIn === "Ultra-secret"
      setIsHidden(isSecretCard)
    } catch (e) {
      console.error("Error fetching card:", e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleReveal = () => setIsHidden(!isHidden);
  const toggleSide = () => setCurrentSide(prev => (prev === 1 ? 2 : 1));

  const isSecretCard = cardData?.foundIn?.includes("Secret Deck") || cardData?.foundIn?.includes("Envelope") || cardData?.foundIn === "Ultra-secret"
  const secretOverlay = <>{
    isSecretCard && <SecretOverlay text={cardData.foundIn} isVisible={isHidden} setIsVisible={setIsHidden} />
  }</>

  return (
    <span className="card-ref-text">
      <button onClick={() => handleFetchAndDisplay(true)}>
        {children}
      </button>
      {focusDisplay && createPortal(
        <div className='focus-card-overlay' style={{ display: focusDisplay ? "flex" : "none" }}>
          <div className='focus-card-overlay__buttons'>
            <button onClick={() => setFocusDisplay(false)}>X</button>
            {cardData?.name2 && (<button onClick={toggleSide}>{getIcon("Flip", undefined, undefined, "1.5em")}</button>)}
            {isSecretCard && (<button onClick={toggleReveal}>{getIcon("Reveal", undefined, undefined, "1.5em")}</button>)}
          </div>
          {isLoading ? (
            <div>Loading card details...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : cardData ? (
            <FocusCard cardData={cardData} currentSide={currentSide} secretOverlay={secretOverlay} />
          ) : (
            <div>Something went wrong.</div>
          )}
        </div>,
        document.getElementById('root'))
      }
    </span>
  )

}

export default FocusCardOverlay