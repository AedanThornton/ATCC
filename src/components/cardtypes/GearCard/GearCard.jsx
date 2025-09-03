import React from "react";
import "/src/styles/cardsStyle.css"
import "./GearCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";
import {getCyclePrimaryColor, getCycleSecondaryColor, getGateColor} from "../../../lib/colors.js"

const GearCard = ({ gear, index, currentSide }) => {
  let side = currentSide
  if (currentSide === 1) side = ""

  return (
    <div className={`card gear ${gear.cardSize.replace(" ", "-").toLowerCase()} papyrus`} style={{ color: getCyclePrimaryColor(gear["cycle" + side]) }}>
      <div className="card-info">
        <div className="title-icon"><div className={`icon ${gear["cycle" + side] === "Cycle IV" ? "cycle4" : ""}`} style={{ background: getCyclePrimaryColor(gear["cycle" + side])}}>{utils.getIcon(gear["slot" + side], undefined, undefined, "2.1em", "0em")}</div></div>
        <div className="gear-title" style={{ color: getCyclePrimaryColor(gear["cycle" + side]), fontSize: Math.min(19, 300 / (1.2 * gear["name" + side].length)) }}>
          {gear["name" + side]}
        </div>
        <div className="title-icon"><div className={`icon ${gear["cycle" + side] === "Cycle IV" ? "cycle4" : ""}`} style={{ background: getCyclePrimaryColor(gear["cycle" + side])}}>{utils.getIcon("Gear", undefined, undefined, "2em", "0em")}</div></div>
      </div>

      {/* Stats and Image */}
      <div className="gear-card">
        {false && ( /* Disabling image rendering for now. Will reenable if loading images in becomes easier */
          <div className="gear-image">
            <img src={`./src/assets/images/${gear.cardIDs[0]}.png`} alt={gear["name" + side]} />
          </div>
        )}

        {/* Offensive Statistics */}
        <div className="gear-stats-container gear-stats-left">
          {gear["offensiveStatistics" + side].attackDice && (
            <div className="gear-stats">{gear["offensiveStatistics" + side].attackDice} {utils.getIcon("d10", undefined, undefined, "1.5em")}</div>
          )}
          {gear["offensiveStatistics" + side].precision && (
            <div className="gear-stats">{gear["offensiveStatistics" + side].precision}</div>
          )}
          
          {gear["offensiveStatistics" + side].power?.map((p, index) => (
            <div key={index} >
              {p.gate && (
                <div className="gear-stats gate" style={{ background: getGateColor(p.gate.type) }}>
                  <span>{p.gate.type === "Hits" 
                    ? p.gate.value + " " + p.gate.type
                    : utils.createPowerGate(p.gate.type, p.gate.value)}
                  </span>
                </div>
              )}
              <div className="gear-stats">
                {p.plus ? '+ ' : ''}
                {p.type.map((die, subindex) => (
                  utils.getIcon(die, "Power", index+subindex, "1.5em")
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ability Box */}
        <div className="gear-abilities">
          <div>
          {gear["abilities" + side].map((ability, index) => {
            return (
              <React.Fragment key={index}>
                {(ability.flavorName || ability.timing || ability.costs) && (<br/>)}
                <span key={index}>
                  {` `}
                  {(!ability.timingAfter && ability.timing) && (<b>{utils.getIcon(ability.timing)}: </b>)}
                  {ability.costs && ability.costs.map((cost, index) => <>{utils.getIcon(cost, undefined, index)} </>)}
                  {(ability.timingAfter && ability.timing) && (<b> {ability.timing}: </b>)}
                  {ability.flavorName && (<b> {ability.flavorName}: </b>)}
                  {ability.type === "unique"
                    ? ( <React.Fragment key={index}> {utils.updateComponent(`${ability.name}`, index)}</React.Fragment>)
                    : ( <React.Fragment key={index}> {utils.createTooltip(`${ability.name}`, index)}{ability.y_value ? ` ${ability.y_value}-${ability.x_value}` : (ability.x_value ? ` ${ability.x_value}` : "")}</React.Fragment> )
                  }
                  .
                </span>
              </React.Fragment>
            )
          })}
          </div>

          {gear["asteriskEffect" + side] && (<div className="asterisk-text">{gear["asteriskEffect" + side]}</div>)}
        </div>

        {/* Defensive Statistics */}
        <div className="gear-stats-container gear-stats-right">
          {gear["defensiveStatistics" + side].evasionRerolls && (
            <div className="gear-stats gear-stats-right">{gear["defensiveStatistics" + side].evasionRerolls} {utils.getIcon("EvasionReroll", undefined, undefined, "1.5em")}</div>
          )}
          {gear["defensiveStatistics" + side].evasionBonus && (
            <div className="gear-stats gear-stats-right">{gear["defensiveStatistics" + side].evasionBonus} {utils.getIcon("Evasion", undefined, undefined, "1.5em")}</div>
          )}
          {gear["defensiveStatistics" + side].armorDice && (
            <div className="gear-stats gear-stats-right">{gear["defensiveStatistics" + side].armorDice[0].amount} {utils.getIcon(gear["defensiveStatistics" + side].armorDice[0].type, "Armor", undefined, "1.5em")}</div>
          )}
          {gear["defensiveStatistics" + side].resistances?.map((resistance, index) => (
            <div key={index} className="gear-stats gear-stats-right">{resistance.amount} {utils.getIcon(resistance.type, undefined, undefined, "1.5em")}</div>
          ))}
        </div>
      </div>

      <div>
      {/* Gated Abilities */}
      {gear["gatedAbilities" + side] && gear["gatedAbilities" + side].length > 0 && (
        <div className="gated-abilities">
          {gear["gatedAbilities" + side].map((gateGroup, index) => (
            <div key={index} className="card-info" style={{ background: getGateColor(gateGroup.gate) }}>
              <div className="gear-ability-gate">{utils.createAbilityGate(gateGroup.gate, gateGroup.value)}</div>
              <div className="gear-gated-ability">
                {gateGroup.abilities.map((ability, jndex) => 
                  <span key={index+jndex}>
                    {` `}
                    {(!ability.timingAfter && ability.timing) && (<b>{utils.getIcon(ability.timing)}: </b>)}
                    {ability.costs && ability.costs.map((cost, index) => <>{utils.getIcon(cost, undefined, index)} </>)}
                    {(ability.timingAfter && ability.timing) && (<b> {ability.timing}: </b>)}
                    {ability.flavorName && (<b> {ability.flavorName}: </b>)}
                    {ability.type === "unique"
                      ? ( <> {utils.updateComponent(`${ability.name}`, index)}</>)
                      : ( <> {utils.createTooltip(`${ability.name}`)}{ability.y_value ? ` ${ability.y_value}-${ability.x_value}` : (ability.x_value ? ` ${ability.x_value}` : "")}</> )
                    }
                    .
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gear Info */}
        <div className="gear-info" style={{ background: getCyclePrimaryColor(gear["cycle" + side]), color: getCycleSecondaryColor(gear["cycle" + side]) }}>Card Info</div>
        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">Acquisition</div>
          <div className="card-info-detail">{gear["acquisition" + side]}</div>
        </div>
        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">Traits</div>
          <div className="card-info-detail" style={{fontStyle: 'italic'}}>{gear["traits" + side].join(", ")}</div>
        </div>
        {gear["flavor"+ side] && (<div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">Flavor</div>
          <div className="card-info-detail">{gear["flavor" + side]}</div>
        </div>)}
        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
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
