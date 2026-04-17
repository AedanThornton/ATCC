import "/src/styles/cardsStyle.css"
import "./ExplorationCard.css"; // Add corresponding CSS for styling
import {FormattedSentence} from "../../utils/FormattedParagraph.jsx";
import { createGate } from "../../utils/gateUtils.jsx";
import getIcon from "../../utils/iconUtils.jsx";
import CardFooter from "../../cards/CardFooter.jsx";

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
        {exploration.effects?.map((effect, index) => (
          <p key={index}>
            {effect.gate && createGate([effect.gate], [effect.value], "#000")}
            {" "}
            <FormattedSentence sentence={effect} />
          </p>
        ))}
        <div style={{ borderTop: exploration.effects2?.length > 0 ? "1px solid black" : "none", margin: "4% 10%"}}></div>
        {exploration.effects2?.map((effect, index) => (
          <p key={index}>
            {effect.gate && createGate([effect.gate], [effect.value], "#000")}
            {" "}
            <FormattedSentence sentence={effect} />
          </p>
        ))}
      </div>

      {exploration.adversaryTriggers && (
        <div className="adversary-icon-group">
          {Array.from({ length: exploration.adversaryTriggers }).map((_, index) => (
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
        <CardFooter cardIDs={exploration.cardIDs} color="black" />
      </div>

    </div>
  );
};

export default ExplorationCard;