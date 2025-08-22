import React from "react";
import "/src/styles/cardsStyle.css"
import "./TitanCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";
import PatternTable from "../PatternCard/PatternTable.jsx";

const TitanCard = ({ titan, index }) => {
  return (
    <div className={`card titan ${titan.cardSize.replace(" ", "-").toLowerCase()}`} style={{ color: getColor(titan.cycle) }}>
      <div className="titan-details">
        <div className="card-info">
          <div className="titan-title" style={{ color: getColor(titan.cycle), fontSize: Math.min(19, 300 / (1.2 * titan.name.length)) }}>
            {titan.name}
          </div>
        </div>

        {/* Stats and Image */}
        <div className="titan-card">
          {false && ( /* Disabling image rendering for now. Will reenable if loading images in becomes easier */
            <div className="titan-image">
              <img src={`./src/assets/images/${titan.cardIDs[0]}.png`} alt={titan.name} />
            </div>
          )}

          <div className="titan-stats">
            <div>
              {titan.titanPower.split(" + ").map((power, subindex) => (
                <React.Fragment key={`${power}-${subindex}`}>
                  {subindex >= 1 ? " + " : ""}{utils.getIcon(power, "Power", subindex, "1.5em")}
                </React.Fragment>
              ))}
            </div>
            <div>{titan.speed}{utils.getIcon("Speed", undefined, index+"2", "1.5em")}</div>
          </div>

          {/* Abilities */}
          <div className="titan-abilities">
            <div>
            {titan.abilities.map((ability, index) => {
              return (
                <React.Fragment key={index}>
                  {(ability.flavorName || ability.timing || ability.costs) && (<br/>)}
                  <span key={index}>
                    {` `}
                    {(!ability.timingAfter && ability.timing) && (<b>{utils.getIcon(ability.timing)}: </b>)}
                    {ability.costs && utils.inputIconUpdatedComponent(ability.costs.join(" "))}
                    {(ability.timingAfter && ability.timing) && (<b> {ability.timing}: </b>)}
                    {ability.flavorName && (<b> {ability.flavorName}: </b>)}
                    {ability.type === "unique"
                      ? ( <React.Fragment key={index}> {utils.createTooltip(`${ability.name}`, index)}</React.Fragment>)
                      : ( <React.Fragment key={index}> {utils.createTooltip(`${ability.name}`, index)}{ability.y_value ? ` ${ability.y_value}-${ability.x_value}` : (ability.x_value ? ` ${ability.x_value}` : "")}</React.Fragment> )
                    }
                    .
                  </span>
                </React.Fragment>
              )
            })}
            </div>
          </div>
        </div>

        {/* Gated Abilities */}
        <div className="gated-abilities">
          {titan.gatedAbilities.map((ability, index) => {
            const abilityContent = (
              <span key={index}>
                {` `}
                {(!ability.timingAfter && ability.timing) && (<b>{utils.getIcon(ability.timing)}: </b>)}
                {ability.costs && utils.inputIconUpdatedComponent(ability.costs.join(" "))}
                {(ability.timingAfter && ability.timing) && (<b> {ability.timing}: </b>)}
                {ability.flavorName && (<b> {ability.flavorName}: </b>)}
                {ability.type === "unique"
                  ? ( <> {utils.createTooltip(`${ability.name}`)}</>)
                  : ( <> {utils.createTooltip(`${ability.name}`)}{ability.y_value ? ` ${ability.y_value}-${ability.x_value}` : (ability.x_value ? ` ${ability.x_value}` : "")}</> )
                }
                .
              </span>
            )
            
            return (
              <div key={index} className="card-info" style={{ background: getGateColor(ability.gate.type) }}>
                <div className="titan-ability-gate">{utils.createAbilityGate(ability.gate.type, ability.gate.value)}</div>
                <div className="titan-gated-ability">{abilityContent}</div>
              </div>
            )
          })}
        </div>

        {/* Titan Info */}
        <div className="titan-info" style={{ background: getColor(titan.cycle), color: getCycleFontColor(titan.cycle) }}>Card Info</div>
        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{titan.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{titan.cycle}</div>
        </div>
      </div>

      <div className="titan-table">
        <PatternTable table={titan.traumaTable} type={"Trauma"}/>
      </div>
      <div className="titan-table titan-kratos">
        <PatternTable table={titan.kratosTable} type={"Kratos"}/>
      </div>
    </div>
  );
};

// Helper functions for styling
const getColor = (cycle) => {
  const cycleColors = {
    "Cycle I": "#4A3204",
    "Cycle II": "rgb(77, 18, 11)",
    "Cycle III": "#543560",
    "Cycle IV": "#131004",
    "Cycle V": "#05233B",
    "Mnestis Theatre": "#C59A18",
    "Mnestis": "#C59A18",
  };
  return cycleColors[cycle] || "#FFFFFF";
};

const getCycleFontColor = (cycle) => {
  const cycleColors = {
    "Cycle I": "#FFFFFF",
    "Cycle II": "rgb(199, 43, 26)",
    "Cycle III": "#FFFFFF",
    "Cycle IV": "#E7CC68",
    "Cycle V": "#FFFFFF",
    "Mnestis Theatre": "#FFFFFF",
    "Mnestis": "#FFFFFF",
  };
  return cycleColors[cycle] || "#FFFFFF";
};

const getGateColor = (gatetype) => {
  gatetype = gatetype.toLowerCase()
  const gateColors = {
    danger: "rgb(155, 35, 21)",
    fate: "#557DBD",
    rage: "#040404",
    ambrosia: "#5D0D69",
    bleed: "#040404",
    labyrinth: "#7D4921",
    despair: "#0E5653",
    condition: "#C09513",
    "danger+fate": "linear-gradient(90deg, rgba(155,35,21,1) 38%, rgba(34,85,167,1) 62%)",
    midas: "131004",
  };
  return gateColors[gatetype] || "#AAAAAA";
};

export default TitanCard;
