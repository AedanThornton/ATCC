import "/src/styles/cardsStyle.css"
import "./TechnologyCard.css"; // Add corresponding CSS for styling
import getIcon from "../../utils/iconUtils.jsx";
import FocusCardOverlay from "../../FocusCardOverlay.jsx";
import React from "react";

const ProductionFacilityCard = ({ productionFacility, index, currentSide }) => {
  return (
    <div className={`card technology ${productionFacility.cardSize.replace(" ", "-").toLowerCase()} ${currentSide == 2 ? "projectside" : "techside"}`} key={index}>
      <div>
        <div className="card-info">
          <div className="title-icon"><div className={`icon ${productionFacility.cycle === "Cycle IV" ? "cycle4" : ""}`}>{getIcon({name: "CombatTech", size: "2.1em"})}</div></div>
          <div className="technology-title" style={{ fontSize: Math.min(19, 400 / (1.1 * productionFacility.name.length)) }}>
            {productionFacility.name}
          </div>
          <div className="title-icon"></div>
        </div>

        {/* production-facility Project Side */}
        {currentSide == 2 && (
          <div className="technology-project">
            <div className="technology-project-divider">
              {productionFacility.flavorTech && (<div className="technology-project-flavor">
                <i>{productionFacility.flavorProject}</i>
              </div>)}
              <div className="technology-project-header">REQUIREMENTS</div>
              <div className="technology-project-box">
                {productionFacility.requirements.map((req, i, array) => {
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
                {productionFacility.leadsTo.join(", ")}
              </div>
            </div>
          </div>
        )}

        {/* production-facility Tech Side */}
        {currentSide == 1 && (
        <div className="technology-tech">
          <div className="technology-info">
            {productionFacility.facilityName}
          </div>
          {productionFacility.flavorTech && (<div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
            <div className="card-info-header">Flavor Text</div>
            <div className="card-info-detail"><i>{productionFacility.flavorTech}</i></div>
          </div>)}

          {productionFacility.recipes?.map((recipe, index) => (
            <div className="technology-recipes" key={index}>
              <div className="technology-tech-header"><FocusCardOverlay cardID={recipe.refID}>{recipe.name}</FocusCardOverlay></div>
              <div className="technology-tech-box">
                {recipe.ingredients?.map((ingredient, index2) => (
                  <span key={index2}>
                    {index2 > 0 && ", "}
                    {ingredient.count}x{' '}
                    {ingredient.refID 
                      ? <FocusCardOverlay cardID={ingredient.refID}>{ingredient.name}</FocusCardOverlay>
                      : ingredient.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* production-facility Info */}
      <div>
        <div className="technology-info">Card Info</div>

        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{productionFacility.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{productionFacility.cycle}</div>
        </div>
      </div>
      
    </div>
  );
};

export default ProductionFacilityCard;
