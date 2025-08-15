import "/src/styles/cardsStyle.css"
import "./GodformCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";

const GodformCard = ({ godform, index }) => {
  return (
    <div className={`godform ${godform.cardSize.replace(" ", "-").toLowerCase()} card`} key={index}>
      <div className="godform-title" style={{ fontSize: Math.min(19, 400 / (1.1 * godform.name.length)) }}>
        {godform.name.toUpperCase()}
      </div>

      {/* Abilities */}
      {godform.abilities?.map((ability, index) => (
        <div className="godform-ability-box" key={index}>
          <div className="godform-ability-header">{ability.name.toUpperCase()}</div>
          <div className="godform-ability">
            {ability.attack && <div style={{flex: 1}} className="godform-stats-container godform-stats-left">
              {ability.attack.attackDice && (
                <div className="godform-stats">{ability.attack.attackDice} {utils.getIcon("d10")}</div>
              )}
              {ability.attack.precision && (
                <div className="godform-stats">{ability.attack.precision}</div>
              )}
              
              {ability.attack.power?.map((p, index) => (
                <div key={index} >
                  <div className="godform-stats">
                    {p.type.map((die, subindex) => (
                      utils.getIcon(die, "Power", index+subindex)
                    ))}
                  </div>
                </div>
              ))}
            </div>}
            <div style={{flex: 4}}>{utils.updateComponent(`${ability.effects}`)}</div>
          </div>
        </div>
      ))}
      
      {godform.keywords && (
        <div className="godform-ability-box">
          <div className="godform-ability"><div>{utils.updateComponent(godform.keywords.split(", ").join(". "))}</div></div>
        </div>
      )}

      {/* Stats */}
      <div className="godform-stats-box">
        <div className="godform-stats-subbox">
          <div className="godform-stat-circled">{utils.getIcon(godform.power, "Power", undefined)}</div>
          <div className="godform-stat-circled">{utils.getIcon("Speed")}{godform.speed}</div>
        </div>
        <div className="godform-stats-subbox">
          {godform.stats && godform.stats.split(", ").map((stat, index) => (
            <div className="godform-stat-uncircled">{stat.split(" ")[0]} {utils.getIcon(stat.split(" ").slice(1).join(""))}</div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="godform-subtitle">Card Info</div>

      <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="card-info-header">ID(s)</div>
        <div className="card-info-detail">{godform.cardIDs.join(", ")}</div>
      </div>
      <div className="card-info centered">
        <div className="card-info-header">Cycle</div>
        <div className="card-info-detail">{godform.cycle}</div>
      </div>
    </div>
  );
};

export default GodformCard;
