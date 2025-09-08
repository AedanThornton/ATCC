import React from "react";
import "/src/styles/cardsStyle.css"
import "./TitanCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";
import PatternTable from "../PatternCard/PatternTable.jsx";
import {getCyclePrimaryColor, getCycleSecondaryColor, getGateColor} from "../../../lib/colors.js"
import { Abilities, GatedAbilities } from "../../AbilityRenderer.jsx";

const TitanCard = ({ titan, index }) => {
  return (
    <div className={`card titan ${titan.cardSize.replace(" ", "-").toLowerCase()}`} style={{ color: getCyclePrimaryColor(titan.cycle) }}>
      <div className="titan-details">
        <div className="card-info">
          <div className="titan-title" style={{ color: getCyclePrimaryColor(titan.cycle), fontSize: Math.min(19, 300 / (1.2 * titan.name.length)) }}>
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
              <Abilities abilitiesList={titan.abilities} />
            </div>
          </div>
        </div>

        {/* Gated Abilities */}
        <div className="gated-abilities">
          <GatedAbilities gatedAbilitiesList={titan.gatedAbilities} />
        </div>

        {/* Titan Info */}
        <div className="titan-info" style={{ background: getCyclePrimaryColor(titan.cycle), color: getCycleSecondaryColor(titan.cycle) }}>Card Info</div>
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

export default TitanCard;
