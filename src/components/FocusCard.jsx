import '../styles/focuscardpage.css'
import React from 'react';
import renderTypes from '../lib/renderTypes';
import SecretOverlay from './utils/SecretOverlay';
import { useState } from 'react';
import getIcon from './utils/iconUtils';
import { useSpoilers } from "../context/SpoilerContext";

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

function getCardTypeUniqueInfo(cardtype) {
  const cardInfo = {
    "clue": ["Story Card", "Sub Deck"],
    "gear": ["Acquisition", "Traits"],
    "pattern": ["Traits"]
  }

  return cardInfo[cardtype.toLowerCase()]
}

const UniqueCardInfo = ({ cardData, cardInfoList }) => {
  const renderedList = []

  cardInfoList.map((cardInfo, i) => {
    const infoWords = cardInfo.replace(/\s+/g, '')
    const infoKey = infoWords[0].toLowerCase() + infoWords.slice(1)
    if (!cardData[infoKey]) return

    let data = cardData[infoKey]
    if (typeof data !== "string") data = data.join(", ")

    renderedList.push(
      <div key={i}><strong>{cardInfo}:</strong> <p>{data}</p></div>
    )
  })

  return renderedList
}

function FocusCard({ cardData, currentSide = 1, secretOverlay }) {
  const { spoilersEnabled } = useSpoilers();
  const [secretsAreVisible, setSecretsAreVisible] = useState(true);

  const componentRenderer = renderTypes[cardData.renderType];
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
          <div><strong>ID(s):</strong> <p>{cardData.cardIDs.map((id, i, array) => {let isLast = i === array.length - 1; return <React.Fragment key={i}>{`${id}${isLast ? "" : ", "}`}</React.Fragment>})}</p></div>
          <div><strong>Type:</strong> <p>{cardData.techSubType && cardData.techSubType + " "}{cardData.subtype && cardData.subtype + " "}{cardData.cardType} Card</p></div>
          <div><strong>Card Size:</strong> <p>{cardData.cardSize}</p></div>
          <div><strong>Game:</strong> <p>Aeon Trespass: {cardData.game}</p></div>
          <div><strong>Cycle:</strong> <p>{displayCycle(cardData.cycle)}</p></div>
          <div><strong>Lore:</strong> <p><i>{displayFlavor(cardData, currentSide)}</i></p></div>
          {getCardTypeUniqueInfo(cardData.cardType) && <UniqueCardInfo cardData={cardData} cardInfoList={getCardTypeUniqueInfo(cardData.cardType)} />}
        </div>
        {(cardData.faq || cardData.errata) && (<div className="focus-card-info-container">
          {cardData.faq && (<div><strong>FAQ:</strong> <p>{cardData.faq}</p></div>)}
          {cardData.errata && (<div><strong>Errata:</strong> <p>{cardData.errata}</p></div>)}
        </div>)}
        
        <div className="focus-card-info-container focus-card-secrets">
          <button className='focus-card-secrets-button' onClick={() => setSecretsAreVisible(!secretsAreVisible)}>{getIcon({name: "Reveal"})}</button>
          <SecretOverlay text={"This section may contain secrets"} isVisible={spoilersEnabled && secretsAreVisible}/>
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