import "/src/styles/cardsStyle.css"
import "./ConditionCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph";
import CardFooter from "../../CardFooter";

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
        {condition["side" + side].abilities?.map((ability, i) =>
          <div className="condition-abilities-box" key={i}>
            <div className="condition-abilities-header">{ability.title}</div>
            <div className="condition-abilities"><FormattedParagraph paragraph={ability.effects} /></div>
          </div>
        )}

        {condition["side" + side].endOfBattle && (
          <div className="condition-effects"><b>End of Battle: </b>{condition["side" + side].endOfBattle}</div>
        )}
      </div>

      <CardFooter cardIDs={condition.cardIDs} bkgdColor={"#ae6511"} />
    </div>
  );
};

export default ConditionCard;
