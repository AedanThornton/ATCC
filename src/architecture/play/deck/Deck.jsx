import "./deck.css"
import DeckRenderer from './components/DeckRenderer';
import DeckHighlightCard from './components/DeckHighlightCard';
import DeckSelector from './components/DeckSelector';
import { useDeckState } from './hooks/useDeckState';
import PrebuiltDecksBuilder from "./components/PrebuiltDecksBuilder";

function Deck({}) {
  const deckState = useDeckState();

  return (
    <div className="deck-page">
      {deckState.highlightCard && <DeckHighlightCard deckState={deckState} />}
      {deckState.deckSource === "prebuilt" && <PrebuiltDecksBuilder deckState={deckState} />}
      <DeckRenderer deckState={deckState} />
      <DeckSelector deckState={deckState} />
    </div>
  );
}
export default Deck;