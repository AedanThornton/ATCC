import "/src/styles/cardsStyle.css"
import "./PrimordialCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";
import FormattedParagraph, { FormattedSentence } from "../../FormattedParagraph.jsx";
import { useState } from "react";
import primordialAbilities from "../../../data/JSON/primordialAbilityData.json";

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
  const [currentLevel, setCurrentLevel] = useState(0)

  return (
    <div className={`card primordial ${primordial.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>

      <div className="primordial-sheet">
        <div className="primordial-left">
          <div className="primordial-left-header">
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
          </div>

          {primordial.vp && 
            <div className="primordial-vp-container">
              <div className="primordial-vp-circle-box">
                {primordial.vp.vpCount !== "0" && Array.from({ length: primordial.vp.vpCount }, (_, i) => (
                  <div key={index} className="primordial-vp-circle">VP</div>
                ))}
              </div>

              <span className="primordial-climb-test"><b>Climb: </b>Test {primordial.vp.climbTest.stat + " " + primordial.vp.climbTest.difficulty + "+"}</span>
              <div className="primordial-vp-box">
                <div className="primordial-vp-box-left">
                  <div className="primordial-section-header">HOLD ON</div>
                  <div className="primordial-vp-holdon"><b>End of Primordial Round:</b> Test {primordial.vp.holdOn.test}.</div>
                  <div className="primordial-vp-fail"><b>Fail:</b> {primordial.vp.holdOn.fail}</div>
                </div>
                <div className="primordial-vp-box-right">
                  <div className="primordial-section-header">VP EFFECTS</div>
                  <FormattedParagraph paragraph={primordial.vp.effects} />
                </div>
              </div>
            </div>
          }
        </div>
        <div className="primordial-right">
          <div className="primordial-level-bar">
            <div className="primordial-attributes">
              <div className="primordial-attributes__main">
                <div className="primordial-attributes__main-stat-box">
                  <div style={{borderColor: "#107975"}}>
                    {utils.getIcon("ToHit", undefined, undefined, "1.2rem")} {primordial.levels[currentLevel]?.toHit}+</div></div>
                <div className="primordial-attributes__main-stat-box">
                  <div style={{borderColor: "#2f3f66"}} className="primordial-speed">
                    {utils.getIcon("Speed", undefined, undefined, "1.2rem")} {primordial.levels[currentLevel]?.speed === "Inf" ? "∞" : primordial.levels[currentLevel]?.speed}</div></div>
                <div className="primordial-attributes__main-stat-box">
                  <div style={{borderColor: "#931e23"}}>
                    {utils.getIcon("Wounds", undefined, undefined, "1.2rem")} {primordial.levels[currentLevel]?.wounds}</div></div>
              </div>
              <div className="primordial-attributes__bonus">
                {Array.from({ length: 4 }, (_, i) => {
                  const attr = primordial.levels[currentLevel]?.attributes[i]?.name.split(" ") || []
                  return primordial.levels[currentLevel]?.attributes[i]
                  ? (
                    <div key={i} className="primordial-attributes__bonus-stat-box">
                      <span>+{primordial.levels[currentLevel]?.attributes[i].count} {utils.getIcon(attr[0])} {attr.length > 1 && attr.shift() && attr.join(" ")}</span>
                    </div>)
                  : <div key={i} className="primordial-attributes__bonus-stat-placeholder"></div>
                })}
                <div style={{flex: "1 0 0", minWidth: "0"}}></div> {/* 5th bonus stat box, here to prevent the divider */}
              </div>
            </div>
            <div className="primordial-trait-changes">
              <p><b>TRAITS {currentLevel !== 0 && "(+all previous):"}</b></p>
              <p>+{primordial.levels[currentLevel]?.traitsChanges.join(", ")}.</p>
            </div>
          </div>


          <div className="primordial-traits">
            {primordial.levels[currentLevel]?.traitsFullList.map((trait, index) => (
              <>
                <div className="primordial-section-header">{trait.toUpperCase()}</div>
                <p key={index}>
                  { primordialAbilities[trait] 
                    ? <FormattedParagraph paragraph={primordialAbilities[trait]} />
                    : <i>Ability definition not found</i>
                  }
                </p>
              </>
            ))}
          </div>
        </div>
      </div>


      <div>
        <div className="primordial-level-button-box">
          {primordial.levels.length === 10 && (<button onClick={() => setCurrentLevel(0)} >0</button>)}
          {Array.from({ length: 9 }, (_, i) => (
            <button className="primordial-level-button" onClick={() => setCurrentLevel(i)} style={{backgroundColor: currentLevel === i ? "#3a3a3a" : "black"}} key={index}>{toRoman(i+1)}</button>
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
