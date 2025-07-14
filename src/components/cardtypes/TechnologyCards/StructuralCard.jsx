import React from "react";
import "../cardsStyle.css"
import "./TechnologyCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";

const StructuralCard = ({ structural, index }) => {
  return (
    <div className="technology standard fullcard">
      <div className="card-info">
        <div className="title-icon"><div className={`icon ${structural.cycle === "Cycle IV" ? "cycle4" : ""}`}>{utils.getIcon("CombatTech", undefined, undefined, "2.1em", "0em")}</div></div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <div className="technology-title" style={{ fontSize: Math.min(19, 400 / (1.1 * structural.name.length)) }}>
            {structural.name}
          </div>
          {structural.altname && (<div className="technology-subtitle" style={{ fontSize: Math.min(19, 400 / (1.1 * structural.altname.length)) }}>
            {structural.altname}
          </div>)}
        </div>
        <div className="title-icon"></div>
      </div>

      {/* structural Project Side */}
      <div className="technology-project">
        <div className="technology-project-divider">
          {structural.flavorTech && (<div className="technology-flavor">
            {structural.flavorProject}
          </div>)}
          <div className="technology-project-header">REQUIREMENTS</div>
          <div className="technology-project-box">
            <div className="card-info-detail">{structural.requirements.join(", ")}</div>
          </div>
          <div className="technology-project-header">LEADS TO</div>
          <div className="technology-project-box">
            <div className="card-info-detail">{structural.leadsTo.join(", ")}</div>
          </div>
        </div>
      </div>

      {/* structural Tech Side */}
      <div className="technology-tech">
        <div className="technology-subtitle">
          {structural.facilityName}
        </div>
        {structural.flavorTech && (<div className="technology-flavor">
          {structural.flavorTech}
        </div>)}

        {/* Abilities */}
        {structural.abilities?.map((ability, index) => (
          <div className="technology-ability-box" key={index}>
            <div className="technology-ability-header">{ability.name}</div>
            <div className="technology-ability">{ability.type && (<b>{ability.type === "City Negotiation" ? <>{utils.getIcon("City")} Negotiation. </> : `${ability.type}. `}</b>)}{utils.updateComponent(`${ability.effects}`)}</div>
          </div>
        ))}
      </div>

      {/* structural Info */}
      <div className="technology-subtitle">Card Info</div>

      <div className="card-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="card-info-header">ID(s)</div>
        <div className="card-info-detail">{structural.cardIDs.join(", ")}</div>
      </div>
      <div className="card-info">
        <div className="card-info-header">Cycle</div>
        <div className="card-info-detail">{structural.cycle}</div>
      </div>
    </div>
  );
};

export default StructuralCard;
