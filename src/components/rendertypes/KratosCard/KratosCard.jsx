import "/src/styles/cardsStyle.css"
import "./KratosCard.css"; // Add corresponding CSS for styling
import FormattedParagraph, { FormattedSentence } from "../../utils/FormattedParagraph.jsx";

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
      

      {/* Info */}
      <div>
        <div className="kratos-info">Card Info</div>
        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{kratos.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{kratos.cycle}</div>
        </div>
      </div>
      
    </div>
  );
};

export default KratosCard;
