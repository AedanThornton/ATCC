import utils from "./utils";
import { getGateColor } from "../lib/colors";
import "/src/styles/weaponStats.css"

const PowerStack = ({ diceArray }) => {
  const boxHeight = 20 + 5*Math.floor(diceArray.length/2)

  return (
    <span className="power-dice-group"
      style={{
        display: diceArray.length > 1 ? "inline-flex" : "inline",
        height: `${boxHeight}px`
      }}
    >
      {diceArray.map((src, i, array) => {
        const depth = i;
        const dir = i % 2 === 0 ? -1 : 1; // left/right alternating

        const scale = 1 - (depth * 0.05);  // shrink each layer
        let x = dir * (9 - depth);       // zig-zag offset        
        const y = -8 * Math.floor(depth/2) * scale - 2*depth + 6*Math.floor((array.length - 1)/2);    // push upward in pairs

        if (src === "Power" || array.length < 2) return utils.getIcon(src, "Power", i+src, `1.5em`)
        if (i === array.length - 1 && dir === -1) x = 0

        return (
          <div
            key={i}
            className="power-die"
            style={{
              zIndex: 100 - depth,
              transform: `translate(${x}px, ${y}px) scale(${-dir}, 1)`
            }}
          >
            {utils.getIcon(src, "Power", i+src, `${(1 + (0.1 * (3 - Math.floor(depth/2)))) * scale}em`)}
          </div>
        );
      })}
    </span>
  );
}

const WeaponRenderer = ({ statsArray }) => (
  <div className="weapon-stats-bar">
    {statsArray.attackDice && (
      <div className="weapon-stats">{statsArray.attackDice}{utils.getIcon("d10", undefined, undefined, "1.5em")}</div>
    )}
    {statsArray.precision && (
      <div className="weapon-stats">{statsArray.precision}</div>
    )}

    {statsArray.power?.map((p, index) => (
      <div key={index} className="weapon-stats">
        {p.gate && (
          <div className="weapon-stats gate" style={{ background: getGateColor(p.gate.type) }}>
            <span>
              {
                p.gate.type === "Hits" ? p.gate.value + " " + (p.gate.value === "1" ? "Hit" : "Hits")
                  : p.gate.type === "Full Hit" ? "Full Hit"
                    : utils.createPowerGate(p.gate.type, p.gate.value)
              }
            </span>
          </div>
        )}
        <div className="weapon-stats">
          {p.plus ? '+ ' : ''}
          {<PowerStack diceArray={p.type}/>}
        </div>
      </div>
    ))}
  </div>
)

export default WeaponRenderer;