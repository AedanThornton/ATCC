import React from "react";
import "/src/styles/cardsStyle.css"
import "./PatternCard.css"; // Add corresponding CSS for styling
import PatternTable from "./PatternTable.jsx";
import { getGateColor } from "../../../lib/colors.js"
import FormattedParagraph, { GatedFormattedParagraph } from "../../utils/FormattedParagraph.jsx";
import getIcon from "../../utils/iconUtils.jsx";

const PatternCard = ({ pattern, index }) => {
  return (
    <div className={`card pattern ${pattern.cardSize.replace(" ", "-").toLowerCase()}`} style={{ color: getColor(pattern.patternType) }}>
      <div className="pattern-title-section">
        <div className="title-icon"><div className={`icon ${pattern.cycle === "Cycle IV" ? "cycle4" : ""}`} style={{ background: getColor(pattern.patternType) }}>{getIcon({icon: pattern.slot, size: "2.1em"})}</div></div>
        <div className="pattern-title" style={{ color: getColor(pattern.patternType), fontSize: Math.min(19, 300 / (1.2 * pattern.name.length)) }}>
          {pattern.name}
        </div>
        <div className="title-icon"></div>
      </div>

      <div className="pattern-card">
        <PatternTable
          table={pattern.patternType === "Kratos" ? pattern.kratosTable : pattern.traumaTable}
          type={pattern.patternType}
        />
      </div>

      <div>
        {/* Ability Box */}
        <div className="pattern-abilities">
          {pattern.abilities?.length > 0 && <div key={index} style={{ background: getGateColor("danger"), padding: "2px 0", color: "white" }}>
            <FormattedParagraph paragraph={pattern.abilities} />
          </div>}
        </div>

        {/* Gated Abilities */}
        {pattern.gatedAbilities && pattern.gatedAbilities.length > 0 && (
          <GatedFormattedParagraph gatedParagraph={pattern.gatedAbilities} />
        )}

        {/* Pattern Info */}
        <div className="pattern-info" style={{ background: getColor(pattern.patternType) }}>Card Info</div>
        <div className="card-info centered" style={{ lineHeight: "14px", marginBottom: "4px" }}>
          <div className="card-info-header">Traits</div>
          <div className="card-info-detail" style={{ fontStyle: 'italic' }}>{pattern.patternType}, {pattern.patternTrait}</div>
        </div>
        {/* <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">Flavor Text</div>
          <div className="card-info-detail">{pattern.flavor}</div>
        </div>*/}
        <div className="card-info centered" style={{ lineHeight: "14px", marginBottom: "4px" }}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{pattern.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{pattern.cycle}</div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for styling
const getColor = (type) => {
  return type === "Kratos" ? "#000" : "rgba(92,14,5,1)"
};

export default PatternCard;
