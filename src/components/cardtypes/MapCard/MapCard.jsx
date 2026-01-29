import React from "react";
import "/src/styles/cardsStyle.css"
import "./MapCard.css"; // Add corresponding CSS for styling
import { getCyclePrimaryColor, getCycleSecondaryColor, getCycleTextColor } from "../../../lib/colors.js"
import getIcon from "../../utils/iconUtils.jsx"

const MapArrow = ({ cycle, dir, nextTile, split = "", lock = "" }) => {
  const directions = {
    "north": { borderUpColor: getCyclePrimaryColor(cycle) },
    "south": { borderBottomColor: getCyclePrimaryColor(cycle) },
    "west": { borderLeftColor: getCyclePrimaryColor(cycle) },
    "east": { borderRightColor: getCyclePrimaryColor(cycle) }
  }

  return (
    <div className={`map-arrow-box ${dir}`}>
      <div className="map-arrow" style={{ flexFlow: (dir === "east" ? "row-reverse" : "row") }}>
        <div style={{ backgroundColor: getCyclePrimaryColor(cycle) }}>{nextTile}</div>
        {split && <div className="map-arrow-square">{split}</div>}
        {lock &&
          <>
            <div className="map-arrow-square">{getIcon({name: lock})}</div>
            <div className="map-arrow-circle">{getIcon({name: "Lock", size: "0.8rem"})}</div>
          </>
        }
      </div>

      <div className={`map-arrow-symbol-${dir}`} style={directions[cycle]}></div>
    </div>
  )
}

const ArrowArray = ({ dir, arrowArray, cycle }) => {
  return arrowArray.map((arrow, index) =>
    <MapArrow key={index} cycle={cycle} dir={dir} nextTile={arrow.nextTile} split={arrow.split || ""} lock={arrow.lock || ""} />
  )
}

function getCycleWaterColor(cycle) {
  const cycleColors = {
    "Cycle I": "#2450a7ff",
    "Cycle II": "#0a99b9ff",
    "Cycle III": "#765ac9ff",
    "Cycle IV": "#a78824ff",
    "Cycle V": "#132e64ff",
  };
  return cycleColors[cycle] || "#2450a7ff";
}

function getRandomArrow() {
  const arrows = [
    { borderBottomRightRadius: 0 },
    { borderBottomLeftRadius: 0 },
    { borderTopRightRadius: 0 },
    { borderTopLeftRadius: 0 },
  ]

  return arrows[Math.floor(Math.random() * 4)]
}

const MapCard = ({ map, index }) => {
  return (
    <div className={`card map ${map.cardSize.replace(" ", "-").toLowerCase()}`}
      key={index}
      style={{
        outline: `4px solid ${getCyclePrimaryColor(map.cycle)}`,
        outlineOffset: "-8px",
        color: getCycleTextColor(map.cycle),
        backgroundColor: getCycleWaterColor(map.cycle)
      }}
    >

      <div className="map-row">
        <div className="left">
          {/* Placeholder */}
        </div>

        {/* Top Arrows */}
        <div className="middle">
          {map.movementArrows.north && <ArrowArray dir={"north"} cycle={map.cycle} arrowArray={map.movementArrows.north} />}
        </div>

        <div className="map-tile-number map-corner right" style={{ backgroundColor: getCyclePrimaryColor(map.cycle), color: getCycleTextColor(map.cycle) }}>
          {map.name}
        </div>
      </div>

      <div className="map-row" style={{ flex: 1 }}>
        <div className="map-bar left">
          {/* Left Arrows */}
          {map.movementArrows.west && <ArrowArray dir={"west"} cycle={map.cycle} arrowArray={map.movementArrows.west} />}
        </div>

        <div className="map-info-container middle">

          {map.symbols && map.symbols.length > 0 &&
            <div className="map-symbol-container">
              {map.symbols.map((symbol, index) => (
                <div key={index} className="map-symbol" style={getRandomArrow()}>
                  {getIcon({name: symbol})}
                </div>
              ))}
            </div>
          }

          <div className="map-info-text-box" style={{backgroundColor: getCycleSecondaryColor(map.cycle)}}>
            {map.otherFeatures && map.otherFeatures.length > 0 && <>
              <div className="map-info" style={{ backgroundColor: getCyclePrimaryColor(map.cycle) }}>Other Map Details</div>
              <div className="map-other-features">
                {map.otherFeatures.map((feature, index) => (
                  <p key={index}>{feature}.</p>
                ))}
              </div>
            </>}

            {/* Info */}
            <div className="map-info" style={{ backgroundColor: getCyclePrimaryColor(map.cycle) }}>Card Info</div>
            <div className="card-info centered" style={{ lineHeight: "14px", marginBottom: "4px" }}>
              <div className="card-info-header">ID(s)</div>
              <div className="card-info-detail">{map.cardIDs.join(", ")}</div>
            </div>
            <div className="card-info centered">
              <div className="card-info-header">Cycle</div>
              <div className="card-info-detail">{map.cycle}</div>
            </div>
          </div>
        </div>

        <div className="map-bar right">
          {/* Right Arrows */}
          {map.movementArrows.east && <ArrowArray dir={"east"} cycle={map.cycle} arrowArray={map.movementArrows.east} />}
        </div>
      </div>

      <div className="map-row">
        <div>
          {map.progDoom && map.progDoom.length > 0 && <div className="map-symbols map-corner left">
            {map.progDoom.map((symbol, index) => (
              <React.Fragment key={index}>{getIcon({name: symbol, size: "1.3em"})}</React.Fragment>
            ))}
          </div>}
        </div>

        {/* Bottom Arrows */}
        <div className="middle">
          {map.movementArrows.south && <ArrowArray dir={"south"} cycle={map.cycle} arrowArray={map.movementArrows.south} />}
        </div>

        <div className="map-factions map-corner right">
          {map.factions.map((faction, index) => (
            <React.Fragment key={index}>{getIcon({name: faction.split(" ").join(""), size: "1.3em"})}</React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MapCard;
