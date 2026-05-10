import React, { useState } from 'react';
import CardList from '../components/catalog/CardList';
import { useLocalStorage } from '../context/LocalStorageContext';
import CardRenderer from '../components/cards/CardRenderer';
import getIcon from '../components/utils/iconUtils';
import "../styles/deckpage.css"
import DeckRenderer from '../components/deck/DeckRenderer';
import DeckHighlightCard from '../components/deck/DeckHighlightCard';
import DeckActionBar from '../components/deck/DeckActionBar';
import DeckSelector from '../components/deck/DeckSelector';

function DeckPage({ cardSetName = "" }) {
  const { appState, cardCache } = useLocalStorage();

  const [activeCardPool, setActiveCardPool] = useState("deck")
  //Active Card Pools
  const [cardPools, setCardPools] = useState({
    deck: appState.savedSets[cardSetName] || [],
    discard: [],
    removed: []
  })

  const [hiddenCards, setHiddenCards] = useState(() => {
    const newSet = {};
    cardPools.deck.map(card => newSet[card] = false)
    return newSet;
  });
  const [highlightCard, setHighlightCard] = useState(null);

  return (
    <div className="deck-page">
      {highlightCard &&
        <DeckHighlightCard
          highlightCard={highlightCard}
          setHighlightCard={setHighlightCard}
          setCardPools={setCardPools}
        />
      }
      <DeckActionBar
        cardSetName={cardSetName}
        cardPools={cardPools}
        setCardPools={setCardPools}
        hiddenCards={hiddenCards}
        setHiddenCards={setHiddenCards}
        setHighlightCard={setHighlightCard}
        activeCardPool={activeCardPool}
        setActiveCardPool={setActiveCardPool}
      />
      <DeckRenderer
        cardPools={cardPools}
        activeCardPool={activeCardPool}
        hiddenCards={hiddenCards}
        setHiddenCards={setHiddenCards}
      />
      <DeckSelector activeCardPool={activeCardPool} setActiveCardPool={setActiveCardPool} />
    </div>
  );
}
export default DeckPage;