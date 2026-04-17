import { useState } from 'react';
import SecretOverlay from "../utils/SecretOverlay";
import CardMenu from "./CardMenu";
import { useDraggable } from '@dnd-kit/react';

import renderTypes from "../../lib/renderTypes";
import { useSpoilers } from "../../context/SpoilerContext";
import { useModal } from '../../context/FocusContext';

const CardRenderer = ({ cardname, variant = "" }) => {
  const { openModal } = useModal();
  const { spoilersEnabled } = useSpoilers();
  const isNotMobile = window.matchMedia('(hover: hover)').matches;
  const isSecretCard = cardname.foundIn?.includes("Secret Deck") || cardname.foundIn?.includes("Envelope") || cardname.foundIn === "Ultra-secret"

  const [isHidden, setIsHidden] = useState(isSecretCard);
  const [currentSide, setCurrentSide] = useState(1);

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
    openModal("focusCard", { id: cardname.cardIDs[0] })
  }

  const secretOverlay = <>{
    spoilersEnabled && isSecretCard && <SecretOverlay text={cardname.foundIn} isVisible={isHidden} />
  }</>

  const { ref } = useDraggable({ id: `${cardname.cardIDs[0]}` + variant })

  return (
    <div className='card-wrapper'>
      {(isNotMobile && variant !== "backpack")
        ? <div style={{ position: "relative" }} ref={ref}>
          {currentCard}
          {secretOverlay}
          <CardMenu
            card={cardname}
            flipFunc={toggleSide}
            secretFunc={toggleReveal}
            setDisplay={setDisplayHelper}
          />
        </div>

        : <div onClick={setDisplayHelper} ref={ref}>
          {currentCard}
          {secretOverlay}
        </div>
      }

      {variant !== "backpack" && (!spoilersEnabled || !isHidden) && <div className="card-type-marker">
        {cardname.cardType}
      </div>}
    </div>
  )
};

export default CardRenderer;