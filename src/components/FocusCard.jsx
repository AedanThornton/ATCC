import '../styles/focuscardpage.css'
import cardTypes from '../lib/cardTypes';
import SecretOverlay from './utils/secretUtils';
import { useState } from 'react';
import utils from './utils';

function isWide(card){
  return (card.cardSize === "Half-Page" || card.cardSize === "Full-Page" || card.techSubType === "Core")
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
          <div><strong>ID:</strong> <p>{cardData.cardIDs[0]}</p></div>
          <div><strong>Type:</strong> <p>{cardData.cardType}</p></div>
          <div><strong>Cycle:</strong> <p>{cardData.cycle}</p></div>
          <div><strong>Lore:</strong> <p>{cardData.flavor || 'N/A'}</p></div>
        </div>
        <p></p>
        {(cardData.faq || cardData.errata) && (<div className="focus-card-info-container">
          {cardData.faq && (<div><strong>FAQ:</strong> <p>{cardData.faq}</p></div>)}
          {cardData.errata && (<div><strong>Errata:</strong> <p>{cardData.errata}</p></div>)}
        </div>)}
        <p></p>
        
        <div className="focus-card-info-container focus-card-secrets">
          <button className='focus-card-secrets-button' onClick={() => setSecretsAreVisible(!secretsAreVisible)}>{utils.getIcon("Reveal")}</button>
          <SecretOverlay text={"This section may contain secrets"} isVisible={secretsAreVisible}/>
          This card contains the following secrets:
          {(cardData.secrets && cardData.secrets.length > 0) 
            ? cardData.secrets.map((secret, index) => (
              <p key={index}>{secret}</p>
            ))
            : <p>This card contains no known secrets.</p>
          }
        </div>
      </div>
    </>
  )

  return (
    <div className='focus-card-page'>
      {secretOverlay && secretOverlay}
      <h1>{cardData.name}</h1>
      <div className={`focus-card ${isWide(cardData) ? "" : "focus-small"}`}>
        {displayParts}
      </div>
      <div className='spacer'></div>
    </div>
  )
}

export default FocusCard;