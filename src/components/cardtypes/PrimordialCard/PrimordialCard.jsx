import React from "react";
import "/src/styles/cardsStyle.css"
import "./PrimordialCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../FormattedParagraph.jsx";
import { useState } from "react";
import primordialAbilities from "../../../data/JSON/primordialAbilityData.json";
import getIcon from "../../utils/iconUtils.jsx";
import FocusCardOverlay from "../../FocusCardOverlay.jsx";

const toRoman = (num) => {
  var charset = {
    "0": "0",
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

const traitIDs = {
	"Viscious": "AX0446",  
	"Song Of Hopelessness": "AX0517",
	"Lesser Danger Sense":  "BX0715",
	"Slime Trail":  "BX0764",
	"This Train": "BX0765",
	"Highly Toxic": "BX0768",
	"Burden Hardest To Bear": "BX1158",
	"Backwards Momentum": "CT1326",
	"Death By Fate":  "CT1329",
	"Rapid Adaptation": "CX1679",
	"Predator": "CX1681",
	"Quantum Eye":  "DX2387",
	"Bleak Outlook":  "DX2388",
	"Abundance Has Impoverished You": "DX2389",
	"You Will Never Win": "DX2390",
	"Reap the Ashes": "DX2391",
	"Years to Rust":  "DX2392",
	"Inverted Battle":  "DX2393",
	"Amongst the Bleached Bones": "DX3221",
	"Incremental Painment": "DX3222",
	"Wish for a Wish":  "DX3223",
	"Moon Call":  "DX3224",
	"Total Eclipse":  "DX3225",
	"God's Breath": "DX3226",
	"Smother":  "EX3019",
	"Oxygen and Aether":  "EX3020",
	"Phobian Hierarchy":  "EX3211",
	"A Truth for a Truth":  "EX3212",
	"Fat with Fear":  "EX3213",
	"Fat with Light": "EX3213",
	"A Lie For a Truth":  "EX3214",
	"Clicks & Pings": "EX3215",
	"Slow Boiling": "EX3216",
	"Hide & Heatseek":  "EX3217",
	"Mortal Kindling":  "EX3218",
	"Toying": "EX3219",
	"Just a Memory":  "EX3244",
	"All For One":  "BX1059",
	"Ticking Clock":  "BX1060",
	"Argo's Parting Gift":  "EX3227",
	"All for All":  "EX3246",
	"All Good Things":  "EX3247",
	"Scarred":  "AX9968",
	"Time's Woe Momentum":  "CR9994",
	"Argo-Drift Cryptex": "ZX9998",
	"Wise Providence":  "ZX9999",
	"Pitiless Sun": "CV1817",
	"God Among Men":  "CV1818",
	"Race the Sun": "CV1819",
	"Pitiless Sun (Old Haunt)": "DV2536",
	"God Among Men (Old Haunt)":  "DV2537",
	"Glass It All": "DV2538",
	"Old Wounds": "DV2539",
	"Blackbeak Traits": "EX3143",
}

const PrimordialCard = ({ primordial, index }) => {
  const [currentLevel, setCurrentLevel] = useState(0)

  let vpTier = "vp"
  if (primordial.levels[currentLevel]?.traitsFullList.includes("VP Modification")) {
    vpTier = "vp+"
  }

  return (
    <div className={`card primordial ${primordial.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>

      <div className="primordial-sheet">
        <div className="primordial-left">
          <div className="primordial-left-header">
            <div className="primordial-title" style={{ fontSize: Math.min(19, 400 / (1.1 * primordial.name.length)) }}>
              {primordial.name.toUpperCase()}
            </div>

            <div className="primordial-statbar">
              <div>{getIcon("Tile_" + primordial.figure_size)}</div>
              {primordial.diagramEffects?.map((effect, index) => (
                <div key={index}>
                  {getIcon(effect)}
                </div>
              ))}
            </div>
          </div>

          {primordial.vp && 
            <div className="primordial-vp-container">
              <div className="primordial-vp-circle-box">
                {primordial[vpTier].vpCount !== "0" && Array.from({ length: primordial[vpTier].vpCount }, (_, i) => (
                  <div key={index} className="primordial-vp-circle">VP</div>
                ))}
              </div>

              <span className="primordial-climb-test"><b>Climb: </b>Test {primordial[vpTier].climbTest.stat + " " + primordial[vpTier].climbTest.difficulty + "+"}</span>
              <div className="primordial-vp-box">
                <div className="primordial-vp-box-left">
                  <div className="primordial-section-header">HOLD ON</div>
                  <div className="primordial-vp-holdon"><b>End of Primordial Round:</b> Test {primordial[vpTier].holdOn.test}.</div>
                  <div className="primordial-vp-fail"><b>Fail:</b> {primordial[vpTier].holdOn.fail}</div>
                </div>
                <div className="primordial-vp-box-right">
                  <div className="primordial-section-header">VP EFFECTS</div>
                  <FormattedParagraph paragraph={primordial[vpTier].effects} />
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
                    {getIcon("ToHit", undefined, undefined, "1.2rem")} {primordial.levels[currentLevel]?.toHit}+</div></div>
                <div className="primordial-attributes__main-stat-box">
                  <div style={{borderColor: "#2f3f66"}} className="primordial-speed">
                    {getIcon("Speed", undefined, undefined, "1.2rem")} {primordial.levels[currentLevel]?.speed === "Inf" ? "∞" : primordial.levels[currentLevel]?.speed}</div></div>
                <div className="primordial-attributes__main-stat-box">
                  <div style={{borderColor: "#931e23"}}>
                    {getIcon("Wounds", undefined, undefined, "1.2rem")} {primordial.levels[currentLevel]?.wounds}</div></div>
              </div>
              <div className="primordial-attributes__bonus">
                {Array.from({ length: 4 }, (_, i) => {
                  const attr = primordial.levels[currentLevel]?.attributes[i]?.name.split(" ") || []
                  return primordial.levels[currentLevel]?.attributes[i]
                  ? (
                    <div key={i} className="primordial-attributes__bonus-stat-box">
                      <span>
                        {primordial.levels[currentLevel]?.attributes[i].count.startsWith("-") ? "" : "+"}
                        {primordial.levels[currentLevel]?.attributes[i].count}
                        {" "}
                        {getIcon(attr[0])}
                        {" "}
                        {attr.length > 1 && attr.shift() && attr.join(" ")}</span>
                    </div>)
                  : <div key={i} className="primordial-attributes__bonus-stat-placeholder"></div>
                })}
                <div style={{flex: "1 0 0", minWidth: "0"}}></div> {/* 5th bonus stat box, here to prevent the divider */}
              </div>
            </div>
            <div className="primordial-trait-changes">
              <p><b>TRAITS {currentLevel !== 0 && "(+all previous):"}</b></p>
              {primordial.levels[currentLevel]?.traitsChanges.length > 0 && <p>+{primordial.levels[currentLevel]?.traitsChanges.join(", ")}.</p>}
            </div>
          </div>


          <div className="primordial-traits">
            {primordial.levels[currentLevel]?.traitsFullList.map((trait, index) => {
              if (trait === "VP Modification"){return}
              return <React.Fragment key={index}>
                <div className="primordial-section-header">
                  {primordialAbilities[trait]
                    ? <span>{trait.toUpperCase()}</span>
                    : <FocusCardOverlay cardID={traitIDs[trait]}>{trait.toUpperCase()}</FocusCardOverlay>
                  }
                </div>
                <p>
                  {primordialAbilities[trait] && <FormattedParagraph paragraph={primordialAbilities[trait].mainDef} />}
                </p>
              </React.Fragment>
            })}
          </div>
        </div>
      </div>


      <div>
        <div className="primordial-level-button-box">
          {primordial.levels.map((level, i) => (
            <button className="primordial-level-button" onClick={() => setCurrentLevel(i)} style={{backgroundColor: currentLevel === i ? "#3a3a3a" : "black"}} key={index}>{toRoman(level.level)}</button>
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
