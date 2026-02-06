import "/src/styles/cardsStyle.css"
import "./ExplorationCard.css"; // Add corresponding CSS for styling
import {FormattedSentence} from "../../utils/FormattedParagraph.jsx";
import StatTitle from "../../utils/StatTitle.jsx";
import getIcon from "../../utils/iconUtils.jsx";

const ExplorationCard = ({ exploration, index }) => {
  const diplomacies = [
    "Allied", "Friendly", "Neutral", "Unfriendly", "Denounced", "At War", "Aligned with Nemesis", "Hidden", "Distrustful"
  ]

  return (
    <div className={`card exploration ${exploration.cardSize.replace(" ", "-").toLowerCase()}`}>
      {/* Exploration Info */}
      <div className="exploration-title" style={{lineHeight: "19px", fontSize: Math.min(19, 300 / (1.2 * exploration.name.length)) }}>
        {exploration.name.toUpperCase()}
      </div>

      <div className="exploration-effects">
        {exploration.effects[0]?.map((effect, index) => (
          <p key={index} style={{fontSize: "12px", lineHeight: "12px"}}>
            <span className="exploration-effect-text">
              <FormattedSentence sentence={effect} />
            </span>
          </p>
        ))}
        {exploration.effects[1]?.map((effect, index) => {
          let diplomacy = '', diplomacySign = ''
          if (effect.gate) {
            diplomacySign = effect.gate.endsWith('+') ? '+' : effect.gate.endsWith('-') ? '-' : ''
            if (diplomacySign) {
              diplomacy = diplomacies.includes(effect.gate.slice(0, -1)) ? effect.gate.slice(0, -1) : ''
            } else {
              diplomacy = diplomacies.includes(effect.gate) ? effect.gate : ''
            }
          }

          return <p key={index} style={{fontSize: "12px", lineHeight: "12px"}}>
            {diplomacy !== '' && <span className="exploration-diplomacy-banner"><span><StatTitle text={diplomacy} color="white" bkgdColor="black" stat={diplomacySign} /></span></span>}
            <span className="exploration-effect-text">
              <FormattedSentence sentence={effect} />
            </span>
          </p>
        })}
      </div>

      {exploration.adversaryTriggers && (
        <div className="adversary-icon-group">
          {[...Array(exploration.adversaryTriggers)].map((e, index) => (
            <div key={index} className="adversary-icon">
              {getIcon({name: "Adversary", size: "3em", invert: true})}
            </div>
          ))}
        </div>
      )}

      <div className="exploration-footer">
        <div>{exploration.number && (<div className="exploration-footer__number-circle">{exploration.number}</div>)}</div>
        <div className="exploration-footer__remove-effect">{exploration.removeEffect}</div>
        <div>{getIcon({name: exploration.stackType.replace(" ", ""), size: "2.8em"})}</div>
      </div>

      <div>
        <div className="card-info centered" style={{lineHeight: "14px"}}>
            <div className="card-info-header">Cycle:</div>
            <div className="card-info-detail">{exploration.cycle}</div>
        </div>
        <div className="card-info centered" style={{lineHeight: "14px"}}>
            <div className="card-info-header">ID:</div>
            <div className="card-info-detail">{exploration.cardIDs}</div>
        </div>
      </div>

    </div>
  );
};

export default ExplorationCard;