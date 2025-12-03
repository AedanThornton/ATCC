import "/src/styles/cardsStyle.css"
import "./TechnologyCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";
import FormattedParagraph, { FormattedSentence } from "../../FormattedParagraph.jsx";

const ArgoAbilityCard = ({ argoAbility, index, currentSide }) => {
  return (
    <div className={`card technology ${argoAbility.cardSize.replace(" ", "-").toLowerCase()} ${currentSide == 2 ? "projectside" : "techside"}`} key={index}>
      <div>
        <div className="card-info">
          <div className="title-icon"><div className={`icon ${argoAbility.cycle === "Cycle IV" ? "cycle4" : ""}`}>{utils.getIcon("CombatTech", undefined, undefined, "2.1em", "0em")}</div></div>
          <div className="technology-title" style={{ fontSize: Math.min(19, 400 / (1.1 * argoAbility.name.length)) }}>
            {argoAbility.name}
          </div>
          <div className="title-icon"></div>
        </div>

        {/* argo-ability Project Side */}
        {currentSide == 2 && (
        <div className="technology-project">
          <div className="technology-project-divider">
            {argoAbility.flavorTech && (<div className="technology-project-flavor">
              <i>{argoAbility.flavorProject}</i>
            </div>)}
            <div className="technology-project-header">REQUIREMENTS</div>
            <div className="technology-project-box">
              {argoAbility.requirements.map((req, i, array) => {
                return (
                  <>
                  {req.startsWith("@ArgoKnowledge") 
                    ? <>{utils.getIcon("ArgoKnowledge")} {req.split(" ")[1]}</> 
                    : req}
                  {!(i >= array.length - 1) && ", "}
                  </>
                )
              })}
            </div>
            <div className="technology-project-header">LEADS TO</div>
            <div className="technology-project-box">
              {argoAbility.leadsTo.join(", ")}
            </div>
          </div>
        </div>)}

        {/* argo-ability Tech Side */}
        {currentSide == 1 && (
        <div className="technology-tech">
          {argoAbility.flavorTech && (<div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
            <div className="card-info-header">Flavor Text</div>
            <div className="card-info-detail"><i>{argoAbility.flavorTech}</i></div>
          </div>)}

          {argoAbility.abilities?.map((ability, index) => (
            <div className="technology-ability-box" key={index}>
              <div style={{marginTop: "10px"}}></div>
              <div className="technology-ability-header">{ability.name ? ability.name.toUpperCase() : "ABILITY"}</div>
              <div className="technology-ability"><FormattedSentence sentence={ability.effects} /></div>
            </div>
          ))}

          <div className="technology-aa-box">
            {argoAbility.trireme === "TRUE" && (<div className="technology-aa-charges">{utils.getIcon("Trireme")}</div>)}
            {argoAbility.charges && (<div className="technology-aa-charges">{argoAbility.charges}</div>)}
          </div>
        </div>
        )}
      </div>

      {/* argo-ability Info */}
      <div>
        <div className="technology-info">Card Info</div>

        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{argoAbility.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{argoAbility.cycle}</div>
        </div>
      </div>
    </div>
  );
};

export default ArgoAbilityCard;