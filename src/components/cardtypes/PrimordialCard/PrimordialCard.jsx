import "/src/styles/cardsStyle.css"
import "./PrimordialCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";
import { useState } from "react";

const toRoman = (num) => {
  var charset = {
    "1": "I",
    "2": "II",
    "3": "III",
    "4": "IV",
    "5": "V",
    "6": "VI",
    "7": "VII",
    "8": "VIII",
    "9": "IX"
  }

  return charset[num]
}

const PrimordialCard = ({ primordial, index }) => {
  const [currentLevel, setCurrentLevel] = useState(1)

  return (
    <div className={`card primordial ${primordial.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>

      <div className="primordial-sheet">
        <div className="primordial-left">
          <div className="primordial-title" style={{ fontSize: Math.min(19, 400 / (1.1 * primordial.name.length)) }}>
            {primordial.name.toUpperCase()}
          </div>

          <div className="primordial-statbar">
            <div>{utils.getIcon("Tile_" + primordial.figure_size)}</div>
            {primordial.diagramEffects?.map((effect, index) => (
              <div key={index}>
                {utils.getIcon(effect)}
              </div>
            ))}
          </div>

          {primordial.vp && 
            <div className="primordial-vp-container">
              {primordial.vp.vpCount !== "0" && Array.from({ length: primordial.vp.vpCount }, (_, i) => (
                <div key={index} className="primordial-vp-circle">VP</div>
              ))}

              {primordial.vp.climbTest.stat + " " + primordial.vp.climbTest.difficulty + "+"}
              <div className="primordial-vp-box">
                <div className="primordial-vp-box-left">
                  <div className="primordial-vp-holdon"><b>End of Primordial Round:</b> Test {primordial.vp.holdOn.test}</div>
                  <div className="primordial-vp-fail"><b>Fail:</b> {primordial.vp.holdOn.fail}</div>
                </div>
                <div className="primordial-vp-box-right">
                  {primordial.vp.effects.split(". ").map((effect, index) => (
                    <p key={index}>
                      {effect}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          }
        </div>
        <div className="primordial-right">
          <div className="primordial-attributes">
            <div className="primordial-attributes__main">
              <div>{utils.getIcon("ToHit")} {primordial.levels[currentLevel].toHit}+</div>
              <div>{utils.getIcon("Speed")} {primordial.levels[currentLevel].speed === "Inf" ? "∞" : primordial.levels[currentLevel].speed}</div>
              <div>{utils.getIcon("Wounds")} {primordial.levels[currentLevel].wounds}</div>
              <div>{primordial.levels[currentLevel].traitsChanges}</div>
            </div>
            <div className="primordial-attributes__bonus">
              {primordial.levels[currentLevel].attributes?.map((attribute, index) => (
                <div key={index}>
                  +{attribute.count} {utils.updateComponent(attribute.name)}
                </div>
              ))}
            </div>
          </div>


          <div className="primordial-traits">
            {primordial.levels[currentLevel].traitsFullList.join(". ")}
          </div>
        </div>
      </div>


      <div>
        <div className="primordial-level-buttons">
          {primordial.levels.length === 10 && (<button onClick={() => setCurrentLevel(0)} >0</button>)}
          {Array.from({ length: 9 }, (_, i) => (
            <button onClick={() => setCurrentLevel(i)} style={{backgroundColor: currentLevel === i ? "#3a3a3a" : "black"}} key={index}>{toRoman(i+1)}</button>
          ))}
        </div>


        {/* Info */}
        <div className="primordial-info">Card Info</div>
        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{primordial.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{primordial.cycle}</div>
        </div>
      </div>
      
    </div>
  );
};

export default PrimordialCard;
