import CardRenderer from "./CardRenderer";

const CardGrid = ({ isLoading, error, filteredCards }) => {
  if (isLoading) {
    return <div>Loading cards...</div>
  };

  if (error) {
   return <div>Error: {error}</div>
  };

  return (
    <div className="card-list">
      {filteredCards.length > 0 ? (
        filteredCards.map((cardname, index) => {
          return (
            <CardRenderer cardname={cardname} key={cardname.cardIDs[0] + index}/>
          )
        })
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default CardGrid;