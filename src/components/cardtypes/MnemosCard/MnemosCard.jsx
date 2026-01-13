import React from "react";
import "/src/styles/cardsStyle.css"
import "./MnemosCard.css"; // Add corresponding CSS for styling
import { FormattedSentence } from "../../FormattedParagraph.jsx";
import StatTitle from "../../utils/StatTitle.jsx";

const MnemosCard = ({ mnemos, index }) => {
  return (
    <div className={`card mnemos ${mnemos.cardSize.replace(" ", "-").toLowerCase()}`}>
      {/* mnemos Info */}
      <div className="mnemos-title">
        <div style={{lineHeight: "26px", fontSize: Math.min(18, 300 / (1 * mnemos.name.length))}}>
            {mnemos.name.toUpperCase()}
        </div>
        <div style={{fontSize: "14px", color: "gray" }}>
            {mnemos.traits[0].toUpperCase()} - {mnemos.traits[1].toUpperCase()} - {mnemos.traits[2].toUpperCase()}
        </div>
      </div>

      <div className="mnemos-abilities">
        {mnemos.abilities && mnemos.abilities.map((box, index) => (
          <div key={index} className="mnemos-ability">
            {box.map((ability, index2) => (
              <React.Fragment key={index2}>
                <FormattedSentence sentence={ability} inLineGate={true} />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>

      <div className="card-info" style={{marginBottom: "5px"}}>
          <StatTitle text={mnemos.stats[0]} color="#FFF" bkgdColor="#000" />
          {mnemos.stats[1] && <StatTitle text={mnemos.stats[1]} color="#FFF" bkgdColor="#000" />}
      </div>

      <div>
        <div className="card-info offset" style={{lineHeight: "14px"}}>
            <div className="card-info-header">Cycle:</div>
            <div className="card-info-detail">{mnemos.cycle}</div>
        </div>
        <div className="card-info offset" style={{lineHeight: "14px"}}>
            <div className="card-info-header">Flavor:</div>
            <div className="card-info-detail"><i>{mnemos.flavor}.</i></div>
        </div>
        <div className="card-info offset" style={{lineHeight: "14px"}}>
            <div className="card-info-header">ID:</div>
            <div className="card-info-detail">{mnemos.cardIDs}</div>
        </div>
      </div>

    </div>
  );
};

export default MnemosCard;