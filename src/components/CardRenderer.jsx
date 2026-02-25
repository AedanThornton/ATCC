import { useState } from 'react';
import SecretOverlay from "./utils/SecretOverlay";
import getIcon from './utils/iconUtils';
import CardMenu from "./CardMenu";
import Tippy from '@tippyjs/react';

import renderTypes from "../lib/renderTypes";
import FocusCard from './FocusCard';
import { useSpoilers } from "../context/SpoilerContext";

const CardRenderer = ({cardname}) => { 
  const { spoilersEnabled } = useSpoilers();
  const isNotMobile = window.matchMedia('(hover: hover)').matches;
  const isSecretCard = cardname.foundIn?.includes("Secret Deck") || cardname.foundIn?.includes("Envelope") || cardname.foundIn === "Ultra-secret"
 
  const [isHidden, setIsHidden] = useState(isSecretCard);
  const [currentSide, setCurrentSide] = useState(1);
  const [focusDisplay, setFocusDisplay] = useState(false);

  const componentRenderer = renderTypes[cardname.renderType];
  const currentCard = componentRenderer
    ? componentRenderer(cardname, currentSide)
    : null;

  const toggleReveal = () => {
    setIsHidden(!isHidden)
  }

  const toggleSide = () => {
    currentSide == 1
      ? setCurrentSide(2)
      : setCurrentSide(1)
  }

  const setDisplayHelper = () => {
    setFocusDisplay(!focusDisplay);
  }
  
  const secretOverlay = <>{
    spoilersEnabled && isSecretCard && <SecretOverlay text={cardname.foundIn} isVisible={isHidden} />
  }</>

  return (
    <div className='card-wrapper'>
      {isNotMobile
      ? <div style={{position: "relative"}}>
          {currentCard}
          {secretOverlay}
          <CardMenu 
            card={cardname}
            flipFunc={toggleSide}
            secretFunc={toggleReveal}
            setDisplay={setDisplayHelper}
          />
        </div>
        
      : <div onClick={setDisplayHelper}>
          {currentCard}
          {secretOverlay}
        </div>
      }

      {(!spoilersEnabled || !isHidden) && <div className="card-type-marker">
        {cardname.cardType}
      </div>}

      <div className='focus-card-overlay' style={{visibility: focusDisplay ? "visible" : "hidden"}}>
        <div className='focus-card-overlay__buttons'>
          <button onClick={setDisplayHelper}>X</button>
          {cardname.name2 && (<button onClick={toggleSide}>{getIcon({name: "Flip", size: "1.5em"})}</button>)}
          {isSecretCard && (<button onClick={toggleReveal}>{getIcon({name: "Reveal", size: "1.5em"})}</button>)}
        </div>
        <FocusCard cardData={cardname} currentSide={currentSide} secretOverlay={secretOverlay} />
      </div>
      
    </div>
  )
};

export default CardRenderer;