import "./deck.css"
import DeckRenderer from './components/DeckRenderer';
import { useDeckState } from './hooks/useDeckState';

function DeckEdit({}) {
  const deckState = useDeckState();

  return (
    <div className="deck-page">
      <DeckRenderer deckState={deckState} />
    </div>
  );
}
export default DeckEdit;