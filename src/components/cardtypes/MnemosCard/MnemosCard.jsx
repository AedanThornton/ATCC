import React from "react";
import "/src/styles/cardsStyle.css"
import "./MnemosCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index";
import {getGateColor} from "../../../lib/colors.js"

const MnemosAbility = ({ ability, i }) => (
  <span key={i}>
    {` `}
    {(!ability.timingAfter && ability.timing) && (<b>{utils.getIcon(ability.timing)}: </b>)}
    {ability.costs && ability.costs.map((cost, index) => <>{utils.getIcon(cost, undefined, index)} </>)}
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
    <div className={`card mnemos ${mnemos.cardSize.replace(" ", "-").toLowerCase()}`}>
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
          <div key={index} className="mnemos-ability">
            {box.map((ability, index2) => (
              <React.Fragment key={index2}>
                {ability.gate ? 
                  <>
                    {utils.createAbilityGate(ability.gate, ability.value, getGateColor(ability.gate) || "none")}
                    {ability.abilities?.map((gateAbility, index3) => 
                      <MnemosAbility ability={gateAbility} i={index3}></MnemosAbility>
                    )}
                  </>
                  :
                  (<MnemosAbility ability={ability} i={index+index2}></MnemosAbility>)
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
            <div className="card-info-detail"><i>{mnemos.flavor}.</i></div>
        </div>
        <div className="card-info offset" style={{lineHeight: "14px"}}>
            <div className="card-info-header">ID:</div>
            <div className="card-info-detail">{mnemos.cardIDs}</div>
        </div>
      </div>

    </div>
  );
};

export default MnemosCard;