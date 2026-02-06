import "/src/styles/cardsStyle.css"
import "./GearCard.css"; // Add corresponding CSS for styling
import FormattedParagraph, { FormattedSentence, GatedFormattedParagraph } from "../../utils/FormattedParagraph.jsx";
import { getCyclePrimaryColor, getCycleTextColor, getGateColor } from "../../../lib/colors.js"
import WeaponRenderer from "../../utils/WeaponRenderer.jsx";
import { DiceStack } from "../../utils/DiceStack.jsx";
import getIcon from "../../utils/iconUtils.jsx";
import { createPowerGate } from "../../utils/gateUtils.jsx";

const GearCard = ({ gear, index, currentSide }) => {
  let side = currentSide
  if (currentSide === 1) side = ""

  const resistances = ["Midas", "Laser", "Microwave", "Sun", "Despair", "Pain"]

  return (
    <div className={`card gear ${gear.cardSize.replace(" ", "-").toLowerCase()} papyrus`} >
      <div className="card-info">
        <div className="title-icon"><div className={`icon ${gear["cycle" + side] === "Cycle IV" ? "cycle4" : ""}`} style={{ background: getCyclePrimaryColor(gear["cycle" + side]) }}>{getIcon({name: gear["slot" + side], size: "2.1em", invert: true})}</div></div>
        <div className="gear-title" style={{ color: getCyclePrimaryColor(gear["cycle" + side]), fontSize: Math.min(19, 300 / (1.2 * gear["name" + side].length)) }}>
          {gear["name" + side]}
        </div>
        <div className="title-icon"><div className={`icon ${gear["cycle" + side] === "Cycle IV" ? "cycle4" : ""}`} style={{ background: getCyclePrimaryColor(gear["cycle" + side]) }}>{getIcon({name: "Gear", size: "2em", invert: true})}</div></div>
      </div>

      {/* Stats and Image */}
      <div className="gear-card">
        {false && ( /* Disabling image rendering for now. Will reenable if loading images in becomes easier */
          <div className="gear-image">
            <img src={`./src/assets/images/${gear.cardIDs[0]}.png`} alt={gear["name" + side]} />
          </div>
        )}

        {/* Offensive Statistics */}
        <div className="gear-stats-container">
          <WeaponRenderer statsArray={gear["offensiveStatistics" + side]} />
        </div>

        {/* Ability Box */}
        <div className="gear-abilities">
          <div>
            <FormattedParagraph paragraph={gear["abilities" + side]} />
          </div>

          {gear["asteriskEffect" + side] && (<div className="asterisk-text">*<FormattedSentence sentence={gear["asteriskEffect" + side]} />.</div>)}
        </div>

        {/* Defensive Statistics */}
        <div className="gear-stats-container gear-stats-right">
          {gear["defensiveStatistics" + side]?.map((defensiveStat, index) => {
            const isResistance = resistances.includes(defensiveStat.type)
            return (
                    
              <div
                key={index}
                className={`gear-stats gear-stats-right`}
                style={{ 
                  backgroundColor: isResistance && "black",
                  color: isResistance && "white" 
                }}
              >
                {defensiveStat.gate && (
                  <div className="gate" style={{ background: getGateColor(defensiveStat.gate.type) }}>
                    <span>
                      {
                        defensiveStat.gate.type === "Hits" ? defensiveStat.gate.value + " " + (defensiveStat.gate.value === "1" ? "Hit" : "Hits")
                          : defensiveStat.gate.type === "Full Hit" ? "Full Hit"
                            : createPowerGate(defensiveStat.gate.type, defensiveStat.gate.value)
                      }
                    </span>
                  </div>
                )}
                {defensiveStat.type === "Armor"
                  ? <DiceStack diceArray={defensiveStat.armorDice} diceType="Armor"/>
                  : <>{defensiveStat.amount} {getIcon({name: defensiveStat.type, type: "Armor", size: "1.5em", invert: isResistance })}</>
                }
              </div>
            )
          })}
        </div>
      </div>

      <div>
        {/* Gated Abilities */}
        {gear["gatedAbilities" + side] && gear["gatedAbilities" + side].length > 0 && (
          <GatedFormattedParagraph gatedParagraph={gear["gatedAbilities" + side]} />
        )}

        {/* Gear Info */}
        <div className="gear-info" style={{ background: getCyclePrimaryColor(gear["cycle" + side]), color: "white" }}>Card Info</div>
        <div className="card-info centered" style={{ lineHeight: "14px", marginBottom: "4px" }}>
          <div className="card-info-header">Acquisition</div>
          <div className="card-info-detail">{gear["acquisition" + side]}</div>
        </div>
        <div className="card-info centered" style={{ lineHeight: "14px", marginBottom: "4px" }}>
          <div className="card-info-header">Traits</div>
          <div className="card-info-detail" style={{ fontStyle: 'italic' }}>{gear["traits" + side].join(", ")}</div>
        </div>
        {gear["flavor" + side] && (<div className="card-info centered" style={{ lineHeight: "14px", marginBottom: "4px" }}>
          <div className="card-info-header">Flavor</div>
          <div className="card-info-detail">{gear["flavor" + side]}.</div>
        </div>)}
        <div className="card-info centered" style={{ lineHeight: "14px", marginBottom: "4px" }}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{gear["cardIDs" + side].join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{gear["cycle" + side]}</div>
        </div>
      </div>
    </div>
  );
};

export default GearCard;
