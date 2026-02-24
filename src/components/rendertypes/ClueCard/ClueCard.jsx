import "/src/styles/cardsStyle.css"
import "./ClueCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph.jsx";
import CardFooter from "../../CardFooter.jsx";

const ClueCard = ({ clue, index }) => {
  return (
    <div className={`card clue ${clue.cardSize.replace(" ", "-").toLowerCase()}`}>
      {/* Clue Info */}
      <div className="clue-title">
        <div style={{lineHeight: "19px", fontSize: Math.min(19, 300 / (1.2 * clue.name.length)) }}>
            {clue.name.toUpperCase()}
        </div>
        <div style={{fontSize: Math.min(14, 300 / (1.2 * clue.subtitle.length)) }}>
            {clue.subtitle.toUpperCase()}
        </div>
      </div>

      {clue.imageDescription && (
        <div className="clue-text" style={{lineHeight: "14px"}}>
          <b>Image:</b> {clue.imageDescription}
        </div>
      )}

      <div className="clue-text" style={{lineHeight: "14px"}}>
        <FormattedParagraph paragraph={clue.text[0]} />
        <FormattedParagraph paragraph={clue.text[1]} inLineGate={true} />
      </div>

      <div>
        <div className="clue-flavor" style={{lineHeight: "14px", marginBottom: "4px"}}>
          {clue.flavor}
        </div>
        <CardFooter cardIDs={clue.cardIDs} color={"black"} />
      </div>

    </div>
  );
};

export default ClueCard;