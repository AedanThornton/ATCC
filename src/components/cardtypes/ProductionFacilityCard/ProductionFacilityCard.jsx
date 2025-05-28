import React from "react";
import "./ProductionFacilityCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";

const ProductionFacilityCard = ({ productionFacility, index }) => {
  return (
    <div className="production-facility standard">
      <div className="production-facility-info">
        <div className="production-facility-icon"><div className={`icon ${productionFacility.cycle === "Cycle IV" ? "cycle4" : ""}`}>{utils.getIcon("CombatTech", undefined, undefined, "2.1em", "0em")}</div></div>
        <div className="production-facility-title" style={{ fontSize: Math.min(19, 400 / (1.1 * productionFacility.name.length)) }}>
          {productionFacility.name}
        </div>
        <div className="production-facility-icon"></div>
      </div>

      {/* production-facility Project Side */}
      <div className="production-facility-project">
        <div className="production-facility-project-divider">
          {productionFacility.flavorTech && (<div className="production-facility-project-flavor">
            <div className="production-facility-info-header">Flavor Text</div>
            <div className="production-facility-info-detail"><i>{productionFacility.flavorProject}</i></div>
          </div>)}
          <div className="production-facility-project-header">REQUIREMENTS</div>
          <div className="production-facility-project-box">
            <div className="production-facility-info-detail">{productionFacility.requirements.join(", ")}</div>
          </div>
          <div className="production-facility-project-header">LEADS TO</div>
          <div className="production-facility-project-box">
            <div className="production-facility-info-detail">{productionFacility.leadsTo.join(", ")}</div>
          </div>
        </div>
      </div>

      {/* production-facility Tech Side */}
      <div className="production-facility-tech">
        <div className="production-facility-subtitle">
          {productionFacility.facilityName}
        </div>
        {productionFacility.flavorTech && (<div className="production-facility-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="production-facility-info-header">Flavor Text</div>
          <div className="production-facility-info-detail"><i>{productionFacility.flavorTech}</i></div>
        </div>)}

        {productionFacility.recipes?.map((recipe, index) => (
          <div className="production-facility-recipes" key={index}>
            <div className="production-facility-tech-header">{recipe.name}</div>
            <div className="production-facility-tech-box">
              {recipe.ingredients?.map((ingredient, index2) => (
                <span key={index2}>{index2 > 0 && ", "}{ingredient.count}x {ingredient.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* production-facility Info */}
      <div className="production-facility-subtitle">Card Info</div>

      <div className="production-facility-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="production-facility-info-header">ID(s)</div>
        <div className="production-facility-info-detail">{productionFacility.cardIDs.join(", ")}</div>
      </div>
      <div className="production-facility-info">
        <div className="production-facility-info-header">Cycle</div>
        <div className="production-facility-info-detail">{productionFacility.cycle}</div>
      </div>
    </div>
  );
};

export default ProductionFacilityCard;
