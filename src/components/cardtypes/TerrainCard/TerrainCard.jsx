import "/src/styles/cardsStyle.css"
import "./TerrainCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";

const TerrainCard = ({ terrain, index, currentSide }) => {
  return (
    <div className={`card terrain ${terrain.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>
      <div>
        <div className="terrain-title" style={{ fontSize: Math.min(19, 400 / (1.1 * terrain.name.length)) }}>
          {terrain.name.toUpperCase()}
        </div>
      </div>
      
      <div className="terrain-content">
        {/* Tiles */}
        <div className="terrain-tiles">
          {terrain.tiles?.map((tile, index) => (
            <div key={index} className="terrain-tile-container">
              {`${tile.count} x `}
              <div className="terrain-tile-image-container">
                {utils.getIcon(`Tile_${tile.type === "O" ? "2x2" : tile.type}`)}
              </div>
            </div>
          ))}
        </div>

        <div className="terrain-abilities">
          <span key={index}>
            {terrain.keywords.join(". ")}.
          </span>
        </div>

        <div className="terrain-abilities">
          {terrain.abilities?.map((ability, index) => (
            <p key={index}>
              {ability}{ability && "."}
            </p>
          ))}
        </div>
      </div>

      {/* Info */}
      <div>
        <div className="terrain-info">Card Info</div>
        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{terrain.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{terrain.cycle}</div>
        </div>
      </div>
      
    </div>
  );
};

export default TerrainCard;
