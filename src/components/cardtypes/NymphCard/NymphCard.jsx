import "/src/styles/cardsStyle.css"
import "./NymphCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";
import FormattedParagraph from "../../FormattedParagraph.jsx";

const NymphCard = ({ nymph, index }) => {
  return (
    <div className={`card nymph ${nymph.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>
      <div>
        <div className="nymph-title">
          <div style={{lineHeight: "26px", fontSize: Math.min(18, 300 / (1 * nymph.name.length))}}>
              {nymph.name.toUpperCase()}
          </div>
          <div style={{fontSize: "14px"}}>
              {nymph.title.toUpperCase()}
          </div>
        </div>

        {/* Requirements */}
        <div className="nymph-text-box">
          <div className="nymph-text-header">REQUIREMENTS</div>
          <div className="nymph-text"><FormattedParagraph paragraph={nymph.requirements} /></div>
        </div>

        {/* Summoning */}
        <div className="nymph-text-box">
          <div className="nymph-text-header">SUMMONING</div>
          <div className="nymph-text">Spend 1 {utils.getIcon("SummonCharge")} to summon the {nymph.name}. Then, {utils.getIcon("Adversary")}.</div>
        </div>

        {/* Effects */}
        <div className="nymph-text-box">
          <div className="nymph-text-header">EFFECT</div>
          <div className="nymph-text"><FormattedParagraph paragraph={nymph.effects} /></div>
        </div>

      </div>

      {/* Info */}
      <div>
        <div className="nymph-info">Card Info</div>
        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{nymph.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{nymph.cycle}</div>
        </div>
      </div>

    </div>
  );
};

export default NymphCard;
