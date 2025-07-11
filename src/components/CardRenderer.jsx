import React from "react";
import { Link } from "react-router-dom";
import SecretOverlay from "./utils/secretUtils";

import cardTypes from "../lib/cardTypes";

const CardRenderer = ({cardname}) => {  
  const currentCard = cardTypes[cardname.cardType]?.(cardname) || null;
  const secretOverlay = <>{
    (cardname.foundIn?.includes("Secret Deck") || cardname.foundIn?.includes("Envelope"))
    && <SecretOverlay text={cardname.foundIn} />
  }</>

  return (
    <div style={{ position: "relative" }}>
      {secretOverlay}
      <Link to={`/card/${cardname.cardIDs[0]}`}>
        {currentCard}
        <div className="card-type-marker">
          {cardname.cardType}
        </div>
      </Link>
    </div>
  )
};

export default CardRenderer;