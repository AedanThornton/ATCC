import { useEffect, useState } from "react"
import { useLocalStorage } from "../context/LocalStorageContext";
import { useSearchParams } from "react-router-dom";
import { useDecks } from "./useDecks";

export function useDeckState(initialSetName) {
  const { appState } = useLocalStorage();
  const [deckSource, setDeckSource] = useState("custom"); // "custom" or "prebuilt"
  const [activeCardPool, setActiveCardPool] = useState("deck")
  const [cardPools, setCardPools] = useState({
    deck: appState.savedSets[initialSetName] || [],
    discard: [],
    removed: []
  })
  const [hiddenCards, setHiddenCards] = useState(() => {
    const newSet = {};
    cardPools.deck.map(card => newSet[card] = false)
    return newSet;
  });
  const [highlightCard, setHighlightCard] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const prebuiltDeck = useDecks(searchParams);

  useEffect(() => {
    if (deckSource !== "prebuilt") {
      setCardPools(prev => ({
        deck: [],
        discard: [],
        removed: []
      }))
    } else {
      const newCardPools = {}
      prebuiltDeck.otherCardPools?.map(pool => {
        newCardPools[pool.name] = pool.cards.map(card => card.cardIDs[0])
      })

      console.log(newCardPools);
      

      setCardPools(prev => ({
        deck: prebuiltDeck.deckCards.map(card => card.cardIDs[0]),
        discard: [],
        removed: [],
        ...newCardPools
      }))
    }
  }, [deckSource, prebuiltDeck.deckCards, prebuiltDeck.otherCardPools])

  const setHideAllCards = (hide) => {
    setHiddenCards(() => {
      const newSet = {};
      cardPools.deck.map(card => newSet[card] = hide)
      return newSet;
    })
  }

  const toggleHiddenCards = () => {
    const anyNotHidden = cardPools[activeCardPool].some(card => hiddenCards[card] === false)
    anyNotHidden
      ? setHideAllCards(true)
      : setHiddenCards(() => {
        const newSet = {...hiddenCards};
        cardPools[activeCardPool].map(card => newSet[card] = !hiddenCards[card])
        return newSet;
      })
  }  
  
  const toggleSingleHiddenCard = (cardToChange) => {
    setHiddenCards(() => {
      const newSet = {};
      cardPools.deck.map(card => newSet[card] = card === cardToChange ? !hiddenCards[card] : hiddenCards[card])
      return newSet;
    })
  }

  const shuffleCards = () => {
    const cardSetCopy = [...cardPools.deck]
    //Fisher-Yates Shuffle
    for (let i = cardSetCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardSetCopy[i], cardSetCopy[j]] = [cardSetCopy[j], cardSetCopy[i]];
    }

    setCardPools(prev => ({
      ...prev,
      deck: cardSetCopy
    }))
  }

  const drawCard = () => {
    let i = cardPools.deck.length - 1
    const chosenCard = Math.floor(Math.random() * (i + 1));

    setHighlightCard(cardPools.deck[chosenCard])
  }

  const returnAllCardsToDeck = () => {
    setCardPools(prev => ({
      ...prev,
      [activeCardPool]: [],
      deck: [...prev.deck, ...prev[activeCardPool]]
    }))
  }

  const moveCard = (card, prevLoc, newLoc) => {
    setCardPools(prev => ({
      ...prev,
      [newLoc]: [...prev[newLoc], card],
      [prevLoc]: prev[prevLoc].filter(c => c !== card)
    }))
  }

  return { 
    toggleHiddenCards, shuffleCards, drawCard, returnAllCardsToDeck, setHideAllCards, toggleSingleHiddenCard, moveCard,
    deckSource, cardPools, activeCardPool, highlightCard, hiddenCards,
    setCardPools, setDeckSource, setActiveCardPool, setHiddenCards, setHighlightCard
  }
}