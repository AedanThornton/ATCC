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
  let AIData = Object.fromEntries(
    Object.entries(dahaka)
    .filter(([key, value]) => key.startsWith("AI"))
    .map(([key, value]) => [key.slice(2), value])
  )
  let BPData = Object.fromEntries(
    Object.entries(dahaka)
    .filter(([key, value]) => key.startsWith("BP"))
    .map(([key, value]) => [key.slice(2), value])
  )

  AIData["name"] = dahaka["ai_name"]
  BPData["name"] = dahaka["bp_name"]

  return (
    <div key={index} className={`card dahaka ai-card bp-card ${dahaka.cardSize.replace(" ", "-").toLowerCase()}`} style={{ color: getCyclePrimaryColor(isAdversary[dahaka.usedFor] ? "Adversary" : dahaka.cycle) }}>
      <AttackCard attack={{...stdData, ...AIData}} isDahaka={true}/>
      <BPCard bp={{...stdData, ...BPData}} isDahaka={true}/>
    </div>
  );
};

export default DahakaCard;
