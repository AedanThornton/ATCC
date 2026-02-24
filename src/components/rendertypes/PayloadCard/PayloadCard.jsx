import "/src/styles/cardsStyle.css"
import "./PayloadCard.css"; // Add corresponding CSS for styling
import { FormattedSentence } from "../../utils/FormattedParagraph.jsx";
import CardFooter from "../../CardFooter.jsx";

const PayloadCard = ({ payload, index }) => {
  return (
    <div className={`card payload ${payload.cardSize.replace(" ", "-").toLowerCase()}-landscape`} key={index}>
      <div>
        <div className="payload-title" style={{ fontSize: Math.min(19, 400 / (1.1 * payload.name.length)) }}>
          {payload.name.toUpperCase()}
        </div>

        {/* Abilities */}
        {payload.abilities?.map((ability, index) => (
          <div className="payload-ability-box" key={index}>
            <div className="payload-ability-header">{ability.name.toUpperCase()}</div>
            <div className="payload-ability">
              <div style={{flex: 4}}>{ability.cost && <b>{ability.cost}:</b>} <FormattedSentence sentence={ability.effects[0]} /></div>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div>
        <CardFooter cardIDs={payload.cardIDs} color="black" />
      </div>
      
    </div>
  );
};

export default PayloadCard;
