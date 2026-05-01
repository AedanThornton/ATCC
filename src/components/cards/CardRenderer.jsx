import { useState } from 'react';
import SecretOverlay from "../utils/SecretOverlay";
import CardMenu from "./CardMenu";
import { useDraggable } from '@dnd-kit/react';

import renderTypes from "../../lib/renderTypes";
import { useSpoilers } from "../../context/SpoilerContext";
import { useModal } from '../../context/FocusContext';

const CardRenderer = ({ cardData, variant = "" }) => {
  const { openModal } = useModal();
  const { spoilersEnabled } = useSpoilers();
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
    spoilersEnabled && isSecretCard && <SecretOverlay text={cardData.foundIn} isVisible={isHidden} />
  }</>

  const { ref } = useDraggable({ id: `${cardData.cardIDs[0]}` + variant })

  return (
    <div className='card-wrapper' ref={ref}>
      {(isNotMobile && variant !== "backpack")
        ? <div style={{ position: "relative" }}>
          {currentCard}
          {secretOverlay}
          <CardMenu
            card={cardData}
            flipFunc={toggleSide}
            secretFunc={toggleReveal}
            setDisplay={setDisplayHelper}
          />
        </div>

        : <div onClick={variant !== "backpack" ? setDisplayHelper : undefined}>
          {currentCard}
          {secretOverlay}
        </div>
      }

      {variant !== "backpack" && (!spoilersEnabled || !isHidden) && <div className="card-type-marker">
        {cardData.cardType}
      </div>}
    </div>
  )
};

export default CardRenderer;