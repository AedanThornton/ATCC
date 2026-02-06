import "/src/styles/cardsStyle.css"
import "./GodformCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph.jsx";
import WeaponRenderer from "../../utils/WeaponRenderer.jsx";
import getIcon from "../../utils/iconUtils.jsx";

const GodformCard = ({ godform, index }) => {
  return (
    <div className={`card godform ${godform.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>
      <div className="godform-title" style={{ fontSize: Math.min(19, 400 / (1.1 * godform.name.length)) }}>
        {godform.name.toUpperCase()}
      </div>

      {/* Abilities */}
      {godform.abilities?.map((ability, index) => (
        <div className="godform-ability-box" key={index}>
          <div className="godform-ability-header">{ability.name.toUpperCase()}</div>
          <div className="godform-ability">
            {ability.attack && <div style={{flex: 1}}>
              <WeaponRenderer statsArray={ability.attack}/>
            </div>}
            <div style={{flex: 4}}><FormattedParagraph paragraph={ability.effects[0]} /></div>
          </div>
        </div>
      ))}
      
      {godform.keywords[0].length > 0 && (
        <div className="godform-ability-box">
          <div className="godform-ability"><div><FormattedParagraph paragraph={godform.keywords[0]} /></div></div>
        </div>
      )}

      {/* Stats */}
      <div className="godform-stats-box">
        <div className="godform-stats-subbox">
          <div className="godform-stat-circled">{getIcon({name: godform.power, type: "Power"})}</div>
          <div className="godform-stat-circled">{getIcon({name: "Speed"})}{godform.speed}</div>
        </div>
        <div className="godform-stats-subbox">
          {godform.stats && godform.stats.split(", ").map((stat, index) => (
            <div key={index} className="godform-stat-uncircled">{stat.split(" ")[0]} {getIcon({name: stat.split(" ").slice(1).join("")})}</div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div>
        <div className="godform-info">Card Info</div>
        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{godform.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{godform.cycle}</div>
        </div>
      </div>
    </div>
  );
};

export default GodformCard;
