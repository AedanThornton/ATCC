import { getGateColor } from "../lib/colors";
import "/src/styles/weaponStats.css"
import { DiceStack } from "./DiceStack";
import getIcon from "./utils/iconUtils";
import { createPowerGate } from "./utils/gateUtils";

const WeaponRenderer = ({ statsArray }) => (
  <div className="weapon-stats-bar">
    {statsArray.attackDice && (
      <div className="weapon-stats">{statsArray.attackDice}{getIcon("d10", undefined, undefined, "1.5em")}</div>
    )}
    {statsArray.precision && (
      <div className="weapon-stats">{statsArray.precision}</div>
    )}

    {statsArray.power?.map((p, index) => (
      <div key={index} className="weapon-stats" style={{display: p.gate && "unset"}}>
        {p.gate && (
          <div className="gate" style={{ background: getGateColor(p.gate.type) }}>
            <span>
              {
                p.gate.type === "Hits" ? p.gate.value + " " + (p.gate.value === "1" ? "Hit" : "Hits")
                  : p.gate.type === "Full Hit" ? "Full Hit"
                    : createPowerGate(p.gate.type, p.gate.value)
              }
            </span>
          </div>
        )}
        <div className="weapon-stats">
          {p.plus ? '+ ' : ''}
          {<DiceStack diceArray={p.type}/>}
        </div>
      </div>
    ))}
  </div>
)

export default WeaponRenderer;