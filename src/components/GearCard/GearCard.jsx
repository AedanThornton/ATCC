import React from "react";
import "./GearCard.css"; // Add corresponding CSS for styling
import utils from "../utils/index";

const GearCard = ({ gear }) => {
  return (
    <div className="gear" style={{ color: getColor(gear.cycle) }}>
      {/* Card Title */}
      <div className="gear-title" style={{ background: getColor(gear.cycle) }}>
        {gear.name}
      </div>

      {/* Card Image Placeholder */}
      <div className="gear-card">
        <div className="gear-image">
          {/* Replace with an actual image source if available */}
          <img src={`./src/assets/images/${gear["card-ids"][0]}.png`} alt={gear.name} />
        </div>

        {/* Offensive Statistics */}
        {gear["offensive-statistics"] && (
          <div className="gear-stats-container gear-stats-left">
            {gear["offensive-statistics"]["attack-dice"] && (
              <div className="gear-stats">{gear["offensive-statistics"]["attack-dice"]} {utils.getIcon("d10")}</div>
            )}
            {gear["offensive-statistics"]["precision"] && (
              <div className="gear-stats">{gear["offensive-statistics"]["precision"]}</div>
            )}
            
            {/* Power Section */}
            {gear["offensive-statistics"].power?.map((p, index) => (
              <div key={index} >
                {p.gate && (
                  <div className="gear-stats gate" style={{ background: getGateColor(p.gate.type) }}>
                    <span>{utils.inputIconUpdatedComponent(p.gate.type)} {p.gate.value}</span>
                  </div>
                )}
                <div className="gear-stats">
                  {p.amount} {utils.inputIconUpdatedComponent(p.type, "Power")}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Defensive Statistics */}
        {gear["defensive-statistics"].length > 0 && (
          <div className="gear-stats-container gear-stats-right">
            {gear["defensive-statistics"]["evasion-rerolls"] && (
              <div className="gear-stats gear-stats-right">{gear["defensive-statistics"]["evasion-rerolls"]} {utils.getIcon("EvasionReroll")}</div>
            )}
            {gear["defensive-statistics"]["evasion-bonus"] && (
              <div className="gear-stats gear-stats-right">{gear["defensive-statistics"]["evasion-bonus"]} {utils.getIcon("EvasionBonus")}</div>
            )}
            {gear["defensive-statistics"]["armor-dice"] && (
              <div className="gear-stats gear-stats-right">{gear["defensive-statistics"]["armor-dice"]}</div>
            )}
            {gear["defensive-statistics"]["resistances"].map((resistance, index) => (
              <div key={index} className="gear-stats gear-stats-right">{resistance.amount} {utils.inputIconUpdatedComponent(resistance.type)}</div>
            ))}
          </div>
        )}
      </div>

      {/* Gear Info */}
      <div className="gear-info">
        <div className="gear-info-header">Slot</div>
        <div className="gear-info-detail">{gear.slot}</div>
      </div>
      <div className="gear-info">
        <div className="gear-info-header">Traits</div>
        <div className="gear-info-detail">{gear.traits.join(", ")}</div>
      </div>
      <div className="gear-info">
        <div className="gear-info-header">Flavor Text</div>
        <div className="gear-info-detail">{gear.flavor}</div>
      </div>
      <div className="gear-info">
        <div className="gear-info-header">Cycle</div>
        <div className="gear-info-detail">{gear.cycle}</div>
      </div>
    </div>
  );
};

// Helper functions for styling
const getColor = (cycle) => {
  const cycleColors = {
    "Cycle I": "#4A3204",
    "Cycle II": "#492622",
    "Cycle III": "#543560",
    "Cycle IV": "#131004",
    "Cycle V": "#05233B",
    "Mnestis Theatre": "#C59A18",
    "Mnestis": "#C59A18",
  };
  return cycleColors[cycle] || "#FFFFFF";
};

const getGateColor = (gatetype) => {
  gatetype = gatetype.toLowerCase()
  const gateColors = {
    danger: "#9B2315",
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

export default GearCard;
