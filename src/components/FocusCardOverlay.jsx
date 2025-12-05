import SecretOverlay from "./utils/secretUtils";
import { useState, useEffect, Children } from "react";
import utils from "./utils";
import FocusCard from "./FocusCard";
import { createPortal } from "react-dom";

const FocusCardOverlay = ({ cardID, children }) => {
  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Data Effect ---
  useEffect(() => {
    const fetchCard = async () => {
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

      } catch (e) {
        console.error("Error fetching card:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (cardID) fetchCard();
  }, [cardID]);

  let isSecretCard = false
  if (cardData) cardData.foundIn?.includes("Secret Deck") || cardData.foundIn?.includes("Envelope") || cardData.foundIn === "Ultra-secret"

  const [isHidden, setIsHidden] = useState(isSecretCard);
  const [currentSide, setCurrentSide] = useState(1);
  const [focusDisplay, setFocusDisplay] = useState(false);

  const toggleReveal = () => {
    setIsHidden(!isHidden)
  }

  const toggleSide = () => {
    currentSide == 1
      ? setCurrentSide(2)
      : setCurrentSide(1)
  }
  
  const secretOverlay = <>{
    isSecretCard && <SecretOverlay text={cardData.foundIn} isVisible={isHidden} setIsVisible={setIsHidden}/>
  }</>

  // --- Render Logic ---
  if (isLoading) {
    return <div>Loading card details...</div>;
  }

  if (error) {
    return <>{children}</>
  }

  if (!cardData) {
    return <div>Card not found.</div>;
  }

  return (
    <span className="card-ref-text">
      <button onClick={() => setFocusDisplay(!focusDisplay)}>
        {children}
      </button>
      {createPortal(
      <div className='focus-card-overlay' style={{display: focusDisplay ? "flex" : "none"}}>
        <div className='focus-card-overlay__buttons'>
          <button onClick={() => setFocusDisplay(false)}>X</button>
          {cardData.name2 && (<button onClick={toggleSide}>{utils.getIcon("Flip", undefined, undefined, "1.5em")}</button>)}
          {isSecretCard && (<button onClick={toggleReveal}>{utils.getIcon("Reveal", undefined, undefined, "1.5em")}</button>)}
        </div>
        <FocusCard cardData={cardData} currentSide={currentSide} secretOverlay={secretOverlay} />
      </div>, 
      document.getElementById('root'))}
    </span>
  )

}

export default FocusCardOverlay