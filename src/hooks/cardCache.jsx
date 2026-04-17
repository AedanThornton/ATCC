const cardCache = new Map();

export function ingestCards(cards) {
  for (const card of cards) {
    cardCache.set(card.cardIDs[0], card);
  }
}

export default cardCache