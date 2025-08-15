import React from "react";
import "/src/styles/cardsStyle.css"
import "./MnemosCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index";

const Ability = ({ ability, i }) => (
  <span key={i}>
    {` `}
    {(!ability.timingAfter && ability.timing) && (<b>{utils.getIcon(ability.timing)}: </b>)}
    {ability.costs && utils.inputIconUpdatedComponent(ability.costs.join(" "))}
    {(ability.timingAfter && ability.timing) && (<b> {ability.timing}: </b>)}
    {ability.flavorName && (<b> {ability.flavorName}: </b>)}
    {ability.type === "unique"
      ? ( <> {utils.updateComponent(`${ability.name}`, i)}</>)
      : ( <> {utils.createTooltip(`${ability.name}`)}{ability.y_value ? ` ${ability.y_value}-${ability.x_value}` : (ability.x_value ? ` ${ability.x_value}` : "")}</> )
    }
    .
  </span>
);

const MnemosCard = ({ mnemos, index }) => {
  return (
    <div className={`mnemos ${mnemos.cardSize.replace(" ", "-").toLowerCase()} card`}>
      {/* mnemos Info */}
      <div className="mnemos-title">
        <div style={{lineHeight: "26px", fontSize: Math.min(18, 300 / (1 * mnemos.name.length))}}>
            {mnemos.name.toUpperCase()}
        </div>
        <div style={{fontSize: "14px", color: "gray" }}>
            {mnemos.traits[0].toUpperCase()} - {mnemos.traits[1].toUpperCase()} - {mnemos.traits[2].toUpperCase()}
        </div>
      </div>

      <div className="mnemos-abilities">
        {mnemos.abilities && mnemos.abilities.map((box, index) => (
          <div className="mnemos-ability">
            {box.map((ability, index2) => (
              <React.Fragment key={index+index2}>
                {ability.gate ? 
                  <>
                    <div className="mnemos-ability-gate">
                      {utils.createAbilityGate(ability.gate, ability.value, getGateColor(ability.gate) || "none")}
                    </div>
                    {ability.abilities?.map((gateAbility, index3) => 
                      <Ability ability={gateAbility} i={index+index2+index3}></Ability>
                    )}
                  </>
                  :
                  (<Ability ability={ability} i={index+index2}></Ability>)
                }
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>

      <div className="card-info" style={{marginBottom: "5px"}}>
          {utils.createStatTitle(mnemos.stats[0], "#FFF", "#000")}
          {mnemos.stats[1] && utils.createStatTitle(mnemos.stats[1], "#FFF", "#000")}
      </div>

      <div>
        <div className="card-info offset" style={{lineHeight: "14px"}}>
            <div className="card-info-header">Cycle:</div>
            <div className="card-info-detail">{mnemos.cycle}</div>
        </div>
        <div className="card-info offset" style={{lineHeight: "14px"}}>
            <div className="card-info-header">Flavor:</div>
            <div className="card-info-detail"><i>{mnemos.flavor}</i></div>
        </div>
        <div className="card-info offset" style={{lineHeight: "14px"}}>
            <div className="card-info-header">ID:</div>
            <div className="card-info-detail">{mnemos.cardIDs}</div>
        </div>
      </div>

    </div>
  );
};

const getGateColor = (gatetype) => {
  gatetype = gatetype.toLowerCase()
  const gateColors = {
    hits: "rgb(155, 35, 21)",
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

export default MnemosCard;