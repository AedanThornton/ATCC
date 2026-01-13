import { useState } from 'react';
import SecretOverlay from "./utils/SecretOverlay";
import getIcon from './utils/iconUtils';
import CardMenu from "./CardMenu";
import Tippy from '@tippyjs/react';

import cardTypes from "../lib/cardTypes";
import FocusCard from './FocusCard';

const CardRenderer = ({cardname}) => { 
  const isSecretCard = cardname.foundIn?.includes("Secret Deck") || cardname.foundIn?.includes("Envelope") || cardname.foundIn === "Ultra-secret"
 
  const [isHidden, setIsHidden] = useState(isSecretCard);
  const [currentSide, setCurrentSide] = useState(1);
  const [focusDisplay, setFocusDisplay] = useState(false);

  const componentRenderer = cardTypes[cardname.cardType];
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
    isSecretCard && <SecretOverlay text={cardname.foundIn} isVisible={isHidden} setIsVisible={setIsHidden}/>
  }</>

  return (
    <div className='card-wrapper'>
      <Tippy 
        interactive 
        duration={[0, 0]} 
        offset={[15,-25]}
        trigger="mouseenter focus"
        placement="right-start"
        animation="shift-away-extreme"
        appendTo={document.body}
        content={
          <CardMenu 
            card={cardname}
            flipFunc={toggleSide}
            secretFunc={toggleReveal}
            setDisplay={setDisplayHelper}
          />}
      >
        <div>
          {currentCard}
          {secretOverlay}
        </div>
      </Tippy>

      {!isHidden && <div className="card-type-marker">
        {cardname.cardType}
      </div>}

      <div className='focus-card-overlay' style={{display: focusDisplay ? "flex" : "none"}}>
        <div className='focus-card-overlay__buttons'>
          <button onClick={setDisplayHelper}>X</button>
          {cardname.name2 && (<button onClick={toggleSide}>{getIcon("Flip", undefined, undefined, "1.5em")}</button>)}
          {isSecretCard && (<button onClick={toggleReveal}>{getIcon("Reveal", undefined, undefined, "1.5em")}</button>)}
        </div>
        <FocusCard cardData={cardname} currentSide={currentSide} secretOverlay={secretOverlay} />
      </div>
      
    </div>
  )
};

export default CardRenderer;