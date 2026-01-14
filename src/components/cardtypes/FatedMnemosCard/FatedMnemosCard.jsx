import "/src/styles/cardsStyle.css"
import "./FatedMnemosCard.css"; // Add corresponding CSS for styling
import {FormattedSentence} from "../../utils/FormattedParagraph.jsx";
import StatTitle from "../../utils/StatTitle.jsx";

const FatedMnemosCard = ({ fatedMnemos, index }) => {
  return (
    <div className={`card fated-mnemos ${fatedMnemos.cardSize.replace(" ", "-").toLowerCase()}`}>
      {/* FatedMnemos Info */}
      <div className="fated-mnemos-title">
        <div style={{lineHeight: "19px", fontSize: Math.min(19, 300 / (1.2 * fatedMnemos.name.length)) }}>
            {fatedMnemos.name.toUpperCase()}
        </div>
        <div style={{fontSize: "14px", color: "gray" }}>
            {fatedMnemos.traits[0].toUpperCase()} - {fatedMnemos.traits[1].toUpperCase()} - {fatedMnemos.traits[2].toUpperCase()}
        </div>
      </div>

      <div className="fated-mnemos-flavor" style={{lineHeight: "14px"}}>
        {fatedMnemos.flavor}.
      </div>

      <div className="fated-mnemos-effect-box">
        <div className="fated-mnemos-effect"><FormattedSentence sentence={fatedMnemos.effect} /></div>
      </div>

      <div className="card-info" style={{lineHeight: "14px"}}>
          <StatTitle text={fatedMnemos.stats[0]} color="#FFF" bkgdColor="#000" stat="1" />
          {fatedMnemos.stats[1] && <StatTitle text={fatedMnemos.stats[1]} color="#FFF" bkgdColor="#000" stat="1" />}
      </div>

      <div className="fated-mnemos-growth-title">
        GROWTH
      </div>

      <div className="fated-mnemos-effect-box">
        <div className="fated-mnemos-effect-header">{fatedMnemos.growthName}</div>
        <div className="fated-mnemos-effect"><FormattedSentence sentence={fatedMnemos.growthAbility} /></div>
      </div>

      <div>
        <div className="card-info centered" style={{lineHeight: "14px"}}>
            <div className="card-info-header">Cycle:</div>
            <div className="card-info-detail">{fatedMnemos.cycle}</div>
        </div>
        <div className="card-info centered" style={{lineHeight: "14px"}}>
            <div className="card-info-header">ID:</div>
            <div className="card-info-detail">{fatedMnemos.cardIDs}</div>
        </div>
      </div>

    </div>
  );
};

export default FatedMnemosCard;