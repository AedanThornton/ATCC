import React from "react";
import "/src/styles/cardsStyle.css"
import "./TitanCard.css"; // Add corresponding CSS for styling
import PatternTable from "../PatternCard/PatternTable.jsx";
import {getCyclePrimaryColor, getCycleTextColor, getGateColor} from "../../../lib/colors.js"
import FormattedParagraph, { GatedFormattedParagraph } from "../../utils/FormattedParagraph.jsx";
import getIcon from "../../utils/iconUtils.jsx";
import CardFooter from "../../CardFooter.jsx";

const TitanCard = ({ titan, index }) => {
  return (
    <div className={`card titan ${titan.cardSize.replace(" ", "-").toLowerCase()}`} style={{ color: getCyclePrimaryColor(titan.cycle) }}>
      <div className="titan-title" style={{ color: getCyclePrimaryColor(titan.cycle) }}>
        {titan.name}
      </div>

      <div className="titan-main">
        <div className="titan-details">
          {/* Stats and Image */}
          <div className="titan-card">
            <div className="titan-stats">
              <div>
                {titan.titanPower.split(" + ").map((power, subindex) => (
                  <React.Fragment key={`${power}-${subindex}`}>
                    {subindex >= 1 ? " + " : ""}{getIcon({name: power, type: "Power", size: "1.5em"})}
                  </React.Fragment>
                ))}
              </div>
              <div>{titan.speed}{getIcon({name: "Speed", index: index+2, size: "1.5em"})}</div>
            </div>

            {/* Abilities */}
            <div className="titan-abilities">
              <div>
                <FormattedParagraph paragraph={titan.abilities} />
              </div>
            </div>
          </div>

          {/* Gated Abilities */}
          <div className="gated-abilities">
            <GatedFormattedParagraph gatedParagraph={titan.gatedAbilities} />
          </div>

          {/* Titan Info */}
          <CardFooter cardIDs={titan.cardIDs} color={getCyclePrimaryColor(titan.cycle)} />
        </div>

        <div className="titan-table">
          <PatternTable table={titan.traumaTable} type={"Trauma"}/>
        </div>
        <div className="titan-table titan-kratos">
          <PatternTable table={titan.kratosTable} type={"Kratos"}/>
        </div>
      </div>
    </div>
  );
};

export default TitanCard;
