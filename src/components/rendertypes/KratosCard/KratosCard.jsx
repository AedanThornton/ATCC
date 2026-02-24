import "/src/styles/cardsStyle.css"
import "./KratosCard.css"; // Add corresponding CSS for styling
import FormattedParagraph, { FormattedSentence } from "../../utils/FormattedParagraph.jsx";
import CardFooter from "../../CardFooter.jsx";

const KratosCard = ({ kratos, index }) => {
  return (
    <div className={`card kratos ${kratos.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>
      <div>
        <div className="kratos-title" style={{ fontSize: Math.min(19, 400 / (1.1 * kratos.name.length)) }}>
          {kratos.name.toUpperCase()}
        </div>

        {/* Flavor */}
        {kratos.flavor && (<div className="kratos-flavor">"{kratos.flavor}."</div>)}

        {/* Effects */}
        <div className="kratos-effects"><FormattedParagraph paragraph={kratos.effects} /></div>

        {/* Rally */}
        {kratos.rally && (
          <div className="kratos-rally-box">
            <div className="kratos-rally-header">RALLY</div>
            <div className="kratos-rally">
              <p><b>End of your turn:</b> <FormattedSentence sentence={kratos.rally} /></p>
              <p><b>Success:</b> Discard this card.</p>
            </div>
          </div>
        )}
      </div>
      
      <CardFooter cardIDs={kratos.cardIDs} color="black" />
      
    </div>
  );
};

export default KratosCard;
