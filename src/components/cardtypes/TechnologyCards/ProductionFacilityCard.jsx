import React from "react";
import "/src/styles/cardsStyle.css"
import "./TechnologyCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";

const ProductionFacilityCard = ({ productionFacility, index }) => {
  return (
    <div className="technology standard fullcard">
      <div className="card-info">
        <div className="title-icon"><div className={`icon ${productionFacility.cycle === "Cycle IV" ? "cycle4" : ""}`}>{utils.getIcon("CombatTech", undefined, undefined, "2.1em", "0em")}</div></div>
        <div className="technology-title" style={{ fontSize: Math.min(19, 400 / (1.1 * productionFacility.name.length)) }}>
          {productionFacility.name}
        </div>
        <div className="title-icon"></div>
      </div>

      {/* production-facility Project Side */}
      <div className="technology-project">
        <div className="technology-project-divider">
          {productionFacility.flavorTech && (<div className="technology-project-flavor">
            <i>{productionFacility.flavorProject}</i>
          </div>)}
          <div className="technology-project-header">REQUIREMENTS</div>
          <div className="technology-project-box">
            <div className="card-info-detail">{productionFacility.requirements.join(", ")}</div>
          </div>
          <div className="technology-project-header">LEADS TO</div>
          <div className="technology-project-box">
            <div className="card-info-detail">{productionFacility.leadsTo.join(", ")}</div>
          </div>
        </div>
      </div>

      {/* production-facility Tech Side */}
      <div className="technology-tech">
        <div className="technology-subtitle">
          {productionFacility.facilityName}
        </div>
        {productionFacility.flavorTech && (<div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">Flavor Text</div>
          <div className="card-info-detail"><i>{productionFacility.flavorTech}</i></div>
        </div>)}

        {productionFacility.recipes?.map((recipe, index) => (
          <div className="technology-recipes" key={index}>
            <div className="technology-tech-header">{recipe.name}</div>
            <div className="technology-tech-box">
              {recipe.ingredients?.map((ingredient, index2) => (
                <span key={index2}>{index2 > 0 && ", "}{ingredient.count}x {ingredient.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* production-facility Info */}
      <div className="technology-subtitle">Card Info</div>

      <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="card-info-header">ID(s)</div>
        <div className="card-info-detail">{productionFacility.cardIDs.join(", ")}</div>
      </div>
      <div className="card-info centered">
        <div className="card-info-header">Cycle</div>
        <div className="card-info-detail">{productionFacility.cycle}</div>
      </div>
    </div>
  );
};

export default ProductionFacilityCard;
