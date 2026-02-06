import "/src/styles/cardsStyle.css"
import "./ConditionCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph";

const ConditionCard = ({ condition, index, currentSide }) => {
  let side = currentSide
  if (currentSide === 1) side = ""

  return (
    <div className={`card condition ${condition.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>
      <div>
        <div className="condition-title-block">
          <div className="condition-title" style={{ fontSize: Math.min(19, 400 / (1.1 * condition["name" + side].length)) }}>
            {condition["name" + side].toUpperCase()}
          </div>
          {condition["subtitle" + side] && <div className="condition-title" style={{fontSize: "14px"}}>
            {`(${condition["subtitle" + side].toUpperCase()})`}
          </div>}
        </div>

        {/* Effects */}
        <div className="condition-effects"><FormattedParagraph paragraph={condition["side" + side].effect} /></div>

        {/* Abilities */}
        {condition["side" + side].abilities && (
          <div className="condition-abilities-box">
            <div className="condition-abilities-header">{condition["side" + side].abilities.title}</div>
            <div className="condition-abilities"><FormattedParagraph paragraph={condition["side" + side].abilities.effects} /></div>
          </div>
        )}

        {condition["side" + side].endOfBattle && (
          <div className="condition-effects"><b>End of Battle: </b>{condition["side" + side].endOfBattle}</div>
        )}
      </div>

      {/* Info */}
      <div>
        <div className="condition-info">Card Info</div>
        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{condition.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{condition.cycle}</div>
        </div>
      </div>
      
    </div>
  );
};

export default ConditionCard;
