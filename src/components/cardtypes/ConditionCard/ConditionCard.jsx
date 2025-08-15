import "/src/styles/cardsStyle.css"
import "./ConditionCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";

const ConditionCard = ({ condition, index, currentSide }) => {
  return (
    <div className={`card condition ${condition.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>
      {currentSide == 1 && (
        <div>
          <div className="condition-title" style={{ fontSize: Math.min(19, 400 / (1.1 * condition.name.length)) }}>
            {condition.name.toUpperCase()}
          </div>
          {condition.subtitleA && <div className="condition-title" style={{fontSize: "14px"}}>
            {`(${condition.subtitleA.toUpperCase()})`}
          </div>}

          {/* Effects */}
          <div className="condition-effects">{condition.sideA.effect}</div>

          {/* Rally */}
          {condition.sideA.resolution && (
            <div className="condition-resolution-box">
              <div className="condition-resolution-header">{condition.sideA.resolution.split(": ")[0]}</div>
              <div className="condition-resolution">{condition.sideA.resolution.split(": ")[1]}</div>
            </div>
          )}

          {condition.sideA.endOfBattle && (
            <div className="condition-effects">{condition.sideA.endOfBattle}</div>
          )}
        </div>
      )}

      {currentSide == 2 && (
        <div>
          <div className="condition-title" style={{ fontSize: Math.min(19, 400 / (1.1 * condition.name.length)) }}>
            {condition.nameB.toUpperCase()}
          </div>
          {condition.subtitleB && <div className="condition-title" style={{fontSize: "14px"}}>
            {`(${condition.subtitleB.toUpperCase()})`}
          </div>}

          {/* Effects */}
          <div className="condition-effects">{condition.sideB.effect}</div>

          {/* Rally */}
          {condition.sideB.resolution && (
            <div className="condition-resolution-box">
              <div className="condition-resolution-header">{condition.sideB.resolution.split(": ")[0]}</div>
              <div className="condition-resolution">{condition.sideB.resolution.split(": ")[1]}</div>
            </div>
          )}

          {condition.sideB.endOfBattle && (
            <div className="condition-effects"><b>End of Battle: </b>{condition.sideB.endOfBattle}</div>
          )}
        </div>
      )}

      {/* Info */}
      <div>
        <div className="condition-subtitle">Card Info</div>
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
