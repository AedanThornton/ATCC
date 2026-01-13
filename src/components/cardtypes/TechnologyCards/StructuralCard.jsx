import "/src/styles/cardsStyle.css"
import "./TechnologyCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../FormattedParagraph.jsx";
import getIcon from "../../utils/iconUtils.jsx";

const StructuralCard = ({ structural, index, currentSide }) => {
  let side = currentSide
  if (currentSide === 1) side = ""

  return (
    <div className={`card technology ${structural.cardSize.replace(" ", "-").toLowerCase()} ${currentSide == 2 ? "projectside" : "techside"}`} key={index}>
      <div>
        <div className="card-info">
          <div className="title-icon"><div className={`icon ${structural.cycle === "Cycle IV" ? "cycle4" : ""}`}>{getIcon("StructuralTech", undefined, undefined, "2.1em", "0em")}</div></div>
          <div style={{display: "flex", flexDirection: "column"}}>
            <div className="technology-title" style={{ fontSize: Math.min(19, 400 / (1.1 * structural["name" + side].length)) }}>
              {(structural.name2 && currentSide === 2) ? structural.name2 : structural.name}
            </div>
          </div>
          <div className="title-icon"></div>
        </div>

        {/* structural Project Side */}
        {currentSide == 2 && (      
          <div className="technology-project">
            <div className="technology-project-divider">
              {structural.flavorTech && (<div className="technology-flavor">
                {structural.flavorProject}
              </div>)}
              <div className="technology-project-header">REQUIREMENTS</div>
              <div className="technology-project-box">
                {structural.requirements.map((req, i, array) => {
                  return (
                    <>
                    {req.startsWith("@ArgoKnowledge") 
                      ? <>{getIcon("ArgoKnowledge")} {req.split(" ")[1]}</> 
                      : req}
                    {!(i >= array.length - 1) && ", "}
                    </>
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
        {currentSide == 1 && (
          <div className="technology-tech">
            {structural.flavorTech && (<div className="technology-flavor">
              {structural.flavorTech}
            </div>)}

            {/* Abilities */}
            {structural.abilities?.map((ability, index) => (
              <div className="technology-ability-box" key={index}>
                <div className="technology-ability-header">{ability.name.toUpperCase()}</div>
                <div className="technology-ability">{ability.type && (<b>{ability.type === "City Negotiation" ? <>{getIcon("City")} Negotiation. </> : `${ability.type}. `}</b>)}<FormattedParagraph paragraph={ability.effects[0]} /></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* structural Info */}
      <div>
        <div className="technology-info">Card Info</div>

        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{structural.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{structural.cycle}</div>
        </div>
      </div>
      
    </div>
  );
};

export default StructuralCard;
