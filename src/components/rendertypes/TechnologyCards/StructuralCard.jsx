import "/src/styles/cardsStyle.css"
import "./TechnologyCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph.jsx";
import getIcon from "../../utils/iconUtils.jsx";
import React from "react";
import CardFooter from "../../CardFooter.jsx";

const StructuralCard = ({ structural, index, currentSide }) => {
  currentSide = currentSide === 1 ? 2 : 1
  let side = currentSide
  if (currentSide === 1) side = ""

  return (
    <div className={`card technology ${structural.cardSize.replace(" ", "-").toLowerCase()} ${currentSide === 1 ? "projectside" : "techside"}`} key={index}>
      <div>
        <div className="card-info">
          <div className="title-icon"><div className={`icon ${structural.cycle === "Cycle IV" ? "cycle4" : ""}`}>{getIcon({name: "StructuralTech", size: "2.1em", invert: true})}</div></div>
          <div style={{display: "flex", flexDirection: "column"}}>
            <div className="technology-title" style={{ fontSize: Math.min(19, 400 / (1.1 * structural["name" + side].length)) }}>
              {(structural.name2 && currentSide === 2) ? structural.name2 : structural.name}
            </div>
          </div>
          <div className="title-icon"></div>
        </div>

        {/* structural Project Side */}
        {currentSide == 1 && (      
          <div className="technology-project">
            <div className="technology-project-divider">
              {structural.flavorTech && (<div className="technology-flavor">
                {structural.flavorProject}
              </div>)}
              <div className="technology-project-header">REQUIREMENTS</div>
              <div className="technology-project-box">
                {structural.requirements.map((req, i, array) => {
                  return (
                    <React.Fragment key={i}>
                    {req.startsWith("@ArgoKnowledge") 
                      ? <>{getIcon({name: "ArgoKnowledge"})} {req.split(" ")[1]}</> 
                      : req}
                    {!(i >= array.length - 1) && ", "}
                    </React.Fragment>
                  )
                })}
              </div>
              <div className="technology-project-header">LEADS TO</div>
              <div className="technology-project-box">
                {structural.leadsTo.join(", ")}
              </div>
            </div>
          </div>
        )}

        {/* structural Tech Side */}
        {currentSide == 2 && (
          <div className="technology-tech">
            {structural.flavorTech && (<div className="technology-flavor">
              {structural.flavorTech}
            </div>)}

            {/* Abilities */}
            {structural.abilities?.map((ability, index) => (
              <div className="technology-ability-box" key={index}>
                <div className="technology-ability-header">{ability.name.toUpperCase()}</div>
                <div className="technology-ability">{ability.type && (<b>{ability.type === "City Negotiation" ? <>{getIcon({name: "City", invert: true})} Negotiation. </> : `${ability.type}. `}</b>)}<FormattedParagraph paragraph={ability.effects[0]} invertIcons={true} /></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CardFooter cardIDs={structural.cardIDs} />
      
    </div>
  );
};

export default StructuralCard;
