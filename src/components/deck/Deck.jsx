import "./deck.css"
import DeckRenderer from './DeckRenderer';
import DeckHighlightCard from './DeckHighlightCard';
import DeckSelector from './DeckSelector';
import { useDeckState } from '../../hooks/useDeckState';
import DeckActionSidebar from "./DeckActionSidebar";
import PrebuiltDecksBuilder from "./PrebuiltDecksBuilder";

function Deck({}) {
  const deckState = useDeckState("");

  return (
    <div className="deck-page">
      {deckState.highlightCard && <DeckHighlightCard deckState={deckState} />}
      {deckState.deckSource === "prebuilt" && <PrebuiltDecksBuilder deckState={deckState} />}
      <DeckRenderer deckState={deckState} />
      <DeckActionSidebar deckState={deckState} />
      <DeckSelector deckState={deckState} />
    </div>
  );
}
export default Deck;