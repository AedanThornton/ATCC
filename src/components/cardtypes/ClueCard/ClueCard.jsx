import React from "react";
import "./ClueCard.css"; // Add corresponding CSS for styling

const ClueCard = ({ clue, index }) => {
  return (
    <div className="clue mini-american">
      {/* Clue Info */}
      <div className="clue-title">
        <div style={{fontSize: Math.min(19, 300 / (1.2 * clue.name.length)) }}>
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
          <div className="clue-info" style={{lineHeight: "14px"}}>
              <div className="clue-info-header">Subdeck:</div>
              <div className="clue-info-detail">{clue.subdeck}</div>
          </div>
        )}
        {clue.type === "Story" && (
          <div className="clue-info" style={{lineHeight: "14px"}}>
            <div className="clue-info-header">Story Card:</div>
            <div className="clue-info-detail">{clue.storyCard}</div>
          </div>
        )}
        <div className="clue-info" style={{lineHeight: "14px"}}>
            <div className="clue-info-header">Cycle:</div>
            <div className="clue-info-detail">{clue.cycle}</div>
        </div>
        <div className="clue-info" style={{lineHeight: "14px"}}>
            <div className="clue-info-header">ID:</div>
            <div className="clue-info-detail">{clue.cardIDs}</div>
        </div>
      </div>

    </div>
  );
};

export default ClueCard;