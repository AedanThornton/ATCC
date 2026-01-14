import '../styles/focuscardpage.css'
import React from 'react';
import cardTypes from '../lib/cardTypes';
import SecretOverlay from './utils/SecretOverlay';
import { useState } from 'react';
import getIcon from './utils/iconUtils';

function isWide(card){
  return (card.cardSize === "Half-Page" || card.cardSize === "Full-Page" || card.techSubType === "Core")
}

function displayFlavor(cardData, currentSide){
  if (cardData.flavor) return cardData.flavor + "."
  else if (cardData.flavorTech || cardData.flavorProject) return currentSide === 1 ? cardData.flavorTech + "." : cardData.flavorProject + "."
  else return "N/A"
}

function displayCycle(cycle){
  const cycleName = {
    "Cycle I": "Cycle I: Truth of the Labyrinth",
    "Cycle II": "Cycle II: Abysswatchers",
    "Cycle III": "Cycle III: Pitiless of the Sun",
    "Cycle IV": "Cycle IV: Cycles of Infinite Growth",
    "Cycle V": "Cycle V: Truthsayer",
    "ALL": "This card is used in all Cycles"
  }

  return cycleName[cycle]
}

function FocusCard({ cardData, currentSide = 1, secretOverlay }) {
  const [secretsAreVisible, setSecretsAreVisible] = useState(true);

  const componentRenderer = cardTypes[cardData.cardType];
  const currentCard = componentRenderer
    ? componentRenderer(cardData, currentSide)
    : null;

  const displayParts = (
    <>
      <div className='focus-card__card-container'>
        {currentCard}
      </div>
      <div className='focus-card-info-container__container'>
        <div className="focus-card-info-container">
          <h1>{cardData.name}</h1>
          <div><strong>ID(s):</strong> <p>{cardData.cardIDs.map((id, i, array) => {let isLast = i === array.length - 1; return <React.Fragment key={i}>`${id}${isLast ? "" : ", "}`</React.Fragment>})}</p></div>
          <div><strong>Type:</strong> <p>{cardData.techSubType && cardData.techSubType + " "}{cardData.subtype && cardData.subtype + " "}{cardData.cardType} Card</p></div>
          <div><strong>Card Size:</strong> <p>{cardData.cardSize}</p></div>
          <div><strong>Game:</strong> <p>Aeon Trespass: {cardData.game}</p></div>
          <div><strong>Cycle:</strong> <p>{displayCycle(cardData.cycle)}</p></div>
          <div><strong>Lore:</strong> <p><i>{displayFlavor(cardData, currentSide)}</i></p></div>
        </div>
        {(cardData.faq || cardData.errata) && (<div className="focus-card-info-container">
          {cardData.faq && (<div><strong>FAQ:</strong> <p>{cardData.faq}</p></div>)}
          {cardData.errata && (<div><strong>Errata:</strong> <p>{cardData.errata}</p></div>)}
        </div>)}
        
        <div className="focus-card-info-container focus-card-secrets">
          <button className='focus-card-secrets-button' onClick={() => setSecretsAreVisible(!secretsAreVisible)}>{getIcon("Reveal")}</button>
          <SecretOverlay text={"This section may contain secrets"} isVisible={secretsAreVisible}/>
          This card contains the following secrets:
          {(cardData.secrets && cardData.secrets.length > 0) 
            ? cardData.secrets.map((secret, index) => (
              <p key={index}>{secret}</p>
            ))
            : <p>No known secrets.</p>
          }
        </div>
      </div>
    </>
  )

  return (
    <div className='focus-card-page'>
      {secretOverlay && secretOverlay}
      <div className={`focus-card ${isWide(cardData) ? "" : "focus-small"}`}>
        {displayParts}
      </div>
      <div className='spacer'></div>
    </div>
  )
}

export default FocusCard;