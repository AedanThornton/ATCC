import "/src/styles/cardsStyle.css"
import "./DahakaCard.css"; // Add corresponding CSS for styling
import {getCyclePrimaryColor, getCycleSecondaryColor, getGateColor, getCycleTextColor, isAdversary} from "../../../lib/colors.js"
import AttackCard from "../AttackCard/AttackCard.jsx"
import BPCard from "../BPCard/BPCard.jsx"

const DahakaCard = ({ dahaka, index }) => {
  const stdData = Object.fromEntries(
    Object.entries(dahaka)
      .filter(([key, value]) => !(key.startsWith("AI") || key.startsWith("BP")))
  )

  return (
    <div key={index} className={`card dahaka ai-card bp-card ${dahaka.cardSize.replace(" ", "-").toLowerCase()}`} style={{ color: getCyclePrimaryColor(isAdversary[dahaka.usedFor] ? "Adversary" : dahaka.cycle) }}>
      <AttackCard attack={{...stdData, ...dahaka.Attack}} isDahaka={true}/>
      <BPCard bp={{...stdData, ...dahaka.BP}} isDahaka={true}/>
    </div>
  );
};

export default DahakaCard;
