import "../styles/deckpage.css"
import DeckRenderer from '../components/deck/DeckRenderer';
import DeckHighlightCard from '../components/deck/DeckHighlightCard';
import DeckActionBar from '../components/deck/DeckActionBar';
import DeckSelector from '../components/deck/DeckSelector';
import { useLocation } from 'react-router-dom';
import { useDeckState } from '../hooks/useDeckState';

function DeckPage({}) {
  const location = useLocation();
  const initialSetName = location.state?.cardSetName ?? ""
  const deckState = useDeckState(initialSetName);

  return (
    <div className="deck-page">
      {deckState.highlightCard && <DeckHighlightCard deckState={deckState} />}
      <DeckActionBar cardSetName={initialSetName} deckState={deckState} />
      <DeckRenderer deckState={deckState} />
      <DeckSelector deckState={deckState} />
    </div>
  );
}
export default DeckPage;