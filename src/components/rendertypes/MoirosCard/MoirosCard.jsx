import "/src/styles/cardsStyle.css"
import "./MoirosCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph.jsx";
import CardFooter from "../../CardFooter.jsx";

const MoirosCard = ({ moiros, index }) => {
  return (
    <div className={`card moiros ${moiros.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>
      <div>
        <div className="moiros-title" style={{ fontSize: Math.min(19, 400 / (1.1 * moiros.name.length)) }}>
          {moiros.name.toUpperCase()}
        </div>

        {/* Effects */}
        <div className="moiros-effects"><FormattedParagraph paragraph={moiros.effects} /></div>
      </div>

      {/* Info */}
      <div>
        <CardFooter cardIDs={moiros.cardIDs} color="black" />
      </div>
      
    </div>
  );
};

export default MoirosCard;
