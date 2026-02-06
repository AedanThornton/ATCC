import "/src/styles/cardsStyle.css"
import "./TraitCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph.jsx";
import getIcon from "../../utils/iconUtils.jsx";

const TraitCard = ({ trait, index }) => {
  return (
    <div className={`card trait ${trait.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>
      <div>
        <div className="title-row">
          <div className="title-icon"><div className="trait-icon">{getIcon({name: trait.primordial, size: "2.1em"})}</div></div>
          <div className="trait-title" style={{ fontSize: Math.min(19, 400 / (1.1 * trait.name.length)) }}>
            {trait.name.toUpperCase()}
          </div>
          <div className="title-icon trait-level"><div className="trait-icon trait-level-icon">{trait.level || "X"}</div></div>
        </div>

        {/* Effects */}
        <div className="trait-effects"><FormattedParagraph paragraph={trait.effects[0]} /></div>
      </div>
      

      {/* Info */}
      <div>
        <div className="trait-info">Card Info</div>
        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{trait.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{trait.cycle}</div>
        </div>
      </div>
      
    </div>
  );
};

export default TraitCard;
