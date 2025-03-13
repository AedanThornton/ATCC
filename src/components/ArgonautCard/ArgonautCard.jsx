import React from "react";
import "./ArgonautCard.css"; // Add corresponding CSS for styling

const ArgonautCard = ({ argonaut, index }) => {
  return (
    <div className="argonaut mini-american">

        <div className="argonaut-info">
            <div className="argonaut-title" style={{fontSize: Math.min(19, 300 / (1.2 * argonaut.name.length)) }}>
            {argonaut.name}
            </div>
        </div>

        {/* Image */}
        <div className="argonaut-card">
            {false && ( /* Disabling image rendering for now. Will reenable if loading images in becomes easier */
            <div className="argonaut-image">
                <img src={`./src/assets/images/${argonaut.cardIDs}.png`} alt={argonaut.name} />
            </div>
            )}

        {/* Argonaut Info */}
        <div className="argonaut-flavor" style={{lineHeight: "14px", marginBottom: "4px"}}>
            {argonaut.flavor}
        </div>
        <div className="argonaut-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
            <div className="argonaut-info-header">Stat</div>
            <div className="argonaut-info-detail">{argonaut.stat}</div>
        </div>
        <div className="argonaut-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
            <div className="argonaut-info-header">ID</div>
            <div className="argonaut-info-detail">{argonaut.cardIDs}</div>
        </div>
        <div className="argonaut-info">
            <div className="argonaut-info-header">Cycle</div>
            <div className="argonaut-info-detail">{argonaut.cycle}</div>
        </div>
        </div>
    </div>
  );
};

export default ArgonautCard;
