import SecretOverlay from "../utils/SecretOverlay";
import { useState, useEffect, Children } from "react";
import FocusCard from "./FocusCard";
import { createPortal } from "react-dom";
import getIcon from "../utils/iconUtils";
import { useModal } from "../../context/FocusContext";
import { useLocalStorage } from "../../context/LocalStorageContext";

const FocusCardCache = () => {
  const { modal, closeModal } = useModal();
  const { cardCache } = useLocalStorage();

  const [isHidden, setIsHidden] = useState(true);
  const [currentSide, setCurrentSide] = useState(1);

  const toggleReveal = () => setIsHidden(!isHidden);
  const toggleSide = () => setCurrentSide(prev => (prev === 1 ? 2 : 1));
    
  if (!modal.isOpen) return null;

  const cardData = cardCache.get(modal.data.id)

  const isSecretCard = cardData?.foundIn?.includes("Secret Deck") || cardData?.foundIn?.includes("Envelope") || cardData?.foundIn === "Ultra-secret"
  const secretOverlay = <>{
    isSecretCard && <SecretOverlay text={cardData.foundIn} isVisible={isHidden} />
  }</>

  return createPortal(
    <div className='focus-card-overlay'>
      <div className='focus-card-overlay__buttons'>
        <button onClick={() => closeModal()}>X</button>
        {cardData?.name2 && (<button onClick={toggleSide}>{getIcon({name: "Flip", size: "1.5em"})}</button>)}
        {isSecretCard && (<button onClick={toggleReveal}>{getIcon({name: "Reveal", size: "1.5em"})}</button>)}
      </div>
      {cardData ? (
        <FocusCard cardData={cardData} currentSide={currentSide} secretOverlay={secretOverlay} />
      ) : (
        <div>Something went wrong.</div>
      )}
    </div>,
    document.getElementById('root'))
}

export default FocusCardCache