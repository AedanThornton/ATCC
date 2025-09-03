import React from "react";
import "/src/styles/cardsStyle.css"
import "./MapCard.css"; // Add corresponding CSS for styling
import utils from "../../utils";

const MapCard = ({ map, index }) => {
  return (
    <div className={`card map ${map.cardSize.replace(" ", "-").toLowerCase()}`} key={index} style={{backgroundColor: getCyclePrimaryColor(map.cycle), color: getCycleSecondaryColor(map.cycle)}}>

      <div className="map-row">
        <div>
          {/* Placeholder */}
        </div>

        {/* Top Arrows */}

        <div className="map-tile-number map-corner">
          {map.name}
        </div>
      </div>

      <div className="map-row">
        <div className="map-bar">
          {/* Left Arrows */}
        </div>

        <div>
          {/* Info */}
          <div className="map-info">Card Info</div>
          <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
            <div className="card-info-header">ID(s)</div>
            <div className="card-info-detail">{map.cardIDs.join(", ")}</div>
          </div>
          <div className="card-info centered">
            <div className="card-info-header">Cycle</div>
            <div className="card-info-detail">{map.cycle}</div>
          </div>
        </div>

        <div className="map-bar">
          {/* Right Arrows */}
        </div>
      </div>

      <div className="map-row">
        <div className="map-symbols map-corner">
          {map.symbols.map((symbol, index) => (
            <React.Fragment key={index}>{utils.getIcon(symbol, undefined, undefined, "1.3em")}</React.Fragment>
          ))}
        </div>

        {/* Bottom Arrows */}

        <div className="map-factions map-corner">
          {map.factions.map((faction, index) => (
            <React.Fragment key={index}>{utils.getIcon(faction, undefined, undefined, "1.3em")}</React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
};

// Helper functions for styling
const getCyclePrimaryColor = (cycle) => {
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

const getCycleSecondaryColor = (cycle) => {
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

export default MapCard;
