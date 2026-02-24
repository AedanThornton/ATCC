import "/src/styles/cardsStyle.css"
import "./TerrainCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph.jsx";
import getIcon from "../../utils/iconUtils.jsx";
import createTooltip from "../../utils/tooltipsUtil.jsx";
import CardFooter from "../../CardFooter.jsx";

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
                {getIcon({name: `Tile_${tile.type === "O" ? "2x2" : tile.type}`})}
              </div>
            </div>
          ))}
        </div>

        <div className="terrain-abilities">
          <span key={index}>
            {terrain.keywords.map((keyword, i, array) => (
              <span key={i}>
                {createTooltip(keyword)}.{i !== array.length - 1 && " "}
              </span>
            ))}
          </span>
        </div>

        <div className="terrain-abilities">
          <FormattedParagraph paragraph={terrain.abilities[0]} />
        </div>
      </div>

      {/* Info */}
      <CardFooter cardIDs={terrain.cardIDs} color="black" />
      
    </div>
  );
};

export default TerrainCard;
