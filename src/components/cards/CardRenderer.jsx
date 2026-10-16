import { useState } from 'react';
import SecretOverlay from "./utils/SecretOverlay";
import CardMenu from "./CardMenu";
import { useDraggable } from '@dnd-kit/react';

import renderTypes from "./rendertypes/renderTypes";
import { useSpoilers } from "../../context/SpoilerContext";
import { useModal } from '../focuscard/FocusContext';

const CardRenderer = ({ cardData, variant = "", menu, notDraggable }) => {
  const { openModal } = useModal();
  const { spoilersEnabled } = useSpoilers();
  const { ref } = useDraggable({ id: `${cardData.cardIDs[0]}` })
  const isNotMobile = window.matchMedia('(hover: hover)').matches;
  const isSecretCard = cardData.foundIn?.includes("Secret Deck") || cardData.foundIn?.includes("Envelope") || cardData.foundIn === "Ultra-secret"

  const [isHidden, setIsHidden] = useState(isSecretCard);
  const [currentSide, setCurrentSide] = useState(1);

  const componentRenderer = renderTypes[cardData.renderType];
  const currentCard = componentRenderer
    ? componentRenderer(cardData, currentSide)
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
    openModal("focusCard", { id: cardData.cardIDs[0] })
  }

  const secretOverlay = <>{
    spoilersEnabled && isSecretCard && 
    <SecretOverlay 
      text={cardData.foundIn}
      subText={cardData.secretCardNumber ? `Card ${cardData.secretCardNumber}` : null}
      isVisible={isHidden} 
    />
  }</>

  menu = <div className="card-menu">
      <CardMenu
        card={cardData}
        flipFunc={toggleSide}
        secretFunc={toggleReveal}
        setDisplay={setDisplayHelper}
        variant={variant}
      />
      {menu ?? null}
    </div>

  return (
    <div className='card-wrapper' ref={!notDraggable ? ref : () => {}}>
      {(isNotMobile)
        ? <div style={{ position: "relative" }}>
          {currentCard}
          {secretOverlay}
          {menu}
        </div>

        : <div onClick={setDisplayHelper}>
          {currentCard}
          {secretOverlay}
        </div>
      }

      {(!spoilersEnabled || !isHidden) && <div className="card-type-marker">
        {cardData.cardType}
      </div>}
    </div>
  )
};

export default CardRenderer;