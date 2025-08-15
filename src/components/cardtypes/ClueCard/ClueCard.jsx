import React from "react";
import "/src/styles/cardsStyle.css"
import "./ClueCard.css"; // Add corresponding CSS for styling

const ClueCard = ({ clue, index }) => {
  return (
    <div className={`card clue ${clue.cardSize.replace(" ", "-").toLowerCase()}`}>
      {/* Clue Info */}
      <div className="clue-title">
        <div style={{lineHeight: "19px", fontSize: Math.min(19, 300 / (1.2 * clue.name.length)) }}>
            {clue.name.toUpperCase()}
        </div>
        <div style={{fontSize: Math.min(14, 300 / (1.2 * clue.subtitle.length)) }}>
            {clue.subtitle.toUpperCase()}
        </div>
      </div>

      {clue.imageDescription && (
        <div className="clue-text" style={{lineHeight: "14px"}}>
          <b>Image:</b> {clue.imageDescription}
        </div>
      )}

      <div className="clue-text" style={{lineHeight: "14px"}}>
        {clue.text}
      </div>

      <div>
        <div className="clue-flavor" style={{lineHeight: "14px", marginBottom: "4px"}}>
            {clue.flavor}
        </div>

        {clue.subdeck && (
          <div className="card-info centered" style={{lineHeight: "14px"}}>
              <div className="card-info-header">Subdeck:</div>
              <div className="card-info-detail">{clue.subdeck}</div>
          </div>
        )}
        {clue.type === "Story" && (
          <div className="card-info centered" style={{lineHeight: "14px"}}>
            <div className="card-info-header">Story Card:</div>
            <div className="card-info-detail">{clue.storyCard}</div>
          </div>
        )}
        <div className="card-info centered" style={{lineHeight: "14px"}}>
            <div className="card-info-header">Cycle:</div>
            <div className="card-info-detail">{clue.cycle}</div>
        </div>
        <div className="card-info centered" style={{lineHeight: "14px"}}>
            <div className="card-info-header">ID:</div>
            <div className="card-info-detail">{clue.cardIDs}</div>
        </div>
      </div>

    </div>
  );
};

export default ClueCard;