import "/src/styles/cardsStyle.css"
import "./NymphCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph.jsx";
import getIcon from "../../utils/iconUtils.jsx";
import CardFooter from "../../CardFooter.jsx";

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
          <div className="nymph-text">Spend 1 {getIcon({name: "SummonCharge"})} to summon the {nymph.name}. Then, {getIcon({name: "Adversary"})}.</div>
        </div>

        {/* Effects */}
        <div className="nymph-text-box">
          <div className="nymph-text-header">EFFECT</div>
          <div className="nymph-text"><FormattedParagraph paragraph={nymph.effects} /></div>
        </div>

      </div>

      {/* Info */}
      <div>
        <CardFooter cardIDs={nymph.cardIDs} color="black" />
      </div>

    </div>
  );
};

export default NymphCard;
