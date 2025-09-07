import utils from "./utils";
import { getGateColor } from "../lib/colors";
import "/src/styles/weaponStats.css"

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
            <span>{p.gate.type === "Hits"
              ? p.gate.value + " " + p.gate.type
              : utils.createPowerGate(p.gate.type, p.gate.value)}
            </span>
          </div>
        )}
        <div className="weapon-stats">
          {p.plus ? '+ ' : ''}
          {p.type.map((die, subindex) => (
            utils.getIcon(die, "Power", index + subindex, "1.5em")
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default WeaponRenderer;