import "/src/styles/cardsStyle.css"
import "./TraitCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph.jsx";
import getIcon from "../../utils/iconUtils.jsx";
import CardFooter from "../../CardFooter.jsx";

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
      <CardFooter cardIDs={trait.cardIDs} color="black" />
      
    </div>
  );
};

export default TraitCard;
