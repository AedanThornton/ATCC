import '../styles/focuscardpage.css'
import cardTypes from '../lib/cardTypes';
import SecretOverlay from './utils/secretUtils';

function FocusCard({ cardData, currentSide = 1 }) {
  const componentRenderer = cardTypes[cardData.cardType];
  const currentCard = componentRenderer
    ? componentRenderer(cardData, currentSide)
    : null;
  const secretOverlay = <>{
    (cardData.usedFor?.includes("Secret Deck") || cardData.usedFor?.includes("Envelope"))
    && <SecretOverlay text={cardData.usedFor} key={index + "cover"} />
  }</>

  const displayParts = (
    <>
      {currentCard}
      <div>
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
      </div>
    </>
  )

  return (
    <div className='focus-card-page'>
      <h1>{cardData.name}</h1>
      {cardData.cardType === "Titan" ? (
        <div className='focus-card focus-big'>{displayParts}</div>
      ) : (
        <div className='focus-card focus-small'>{displayParts}</div>
      )}
      <div className='spacer'></div>
    </div>
  )
}

export default FocusCard;