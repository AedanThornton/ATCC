import React from "react";

// Text length helper function from https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
function getTextWidth(text, font) {
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

const StatTitle = ({ text, color, bkgdColor, stat }) => {

    const lengthAdjustment = 0.95 * getTextWidth(text, "bold 26pt 'Times New Roman'")
    const statAdjustment = 0.6 * getTextWidth(stat, "bold 26pt 'Times New Roman'")

    const XOffset = 0
    const YOffset = 4
    const Height = 37 - YOffset
    const Width = 75 - XOffset + (lengthAdjustment)
    const Arrow = 12
    const SplitPoint = Width * 0.48
    const SplitSize = 3

    const iconPoints = `${XOffset} ${Height/2 + YOffset},
                        ${Arrow + XOffset} ${YOffset}, 
                        ${SplitPoint - SplitSize + XOffset + lengthAdjustment/2} ${YOffset},
                        ${(Width - SplitPoint) - SplitSize + XOffset + lengthAdjustment/2} ${Height + YOffset},
                        ${Arrow + XOffset} ${Height + YOffset}`

    const valuePoints = `${SplitPoint + SplitSize + XOffset + lengthAdjustment/2} ${YOffset},
                        ${Width - Arrow + XOffset + statAdjustment} ${YOffset}, 
                        ${Width + XOffset + statAdjustment} ${Height/2 + YOffset}, 
                        ${Width - Arrow + XOffset + statAdjustment} ${Height + YOffset},
                        ${(Width - SplitPoint) + SplitSize + XOffset + lengthAdjustment/2} ${Height + YOffset}`

    const textPolygon = (
        <polygon 
                x="0" 
                y="0" 
                width="120" 
                height="40" 
                stroke={bkgdColor}
                strokeWidth="2"
                fill={bkgdColor}
                points={iconPoints}
        />
    )

    const valuePolygon = (
        <polygon 
                x="0" 
                y="0" 
                width="120" 
                height="40" 
                stroke={bkgdColor}
                strokeWidth="2"
                fill={bkgdColor}
                points={valuePoints}
        />
    )

    const statDisplay = (
        <text 
            x="20" 
            y="29.5" 
            fontSize="26" 
            fontWeight="bold" 
            fill={color}
        >
            {text.toUpperCase()}
        </text>
    )

    const iX = 50+ lengthAdjustment
    const iDisplay = (
        <text 
            x={iX} 
            y="29.5" 
            fontSize="26" 
            fontWeight="bold" 
            fill={color}
        >
            {stat}
        </text>
    )

    return (
        <svg viewBox={`${XOffset} ${YOffset} ${Width} ${Height}`} xmlns="http://www.w3.org/2000/svg" className="ability--svg">
            {textPolygon}
            {valuePolygon}
            {statDisplay}
            {iDisplay}
        </svg>
    );
};

const utils = {
    createStatTitle: (text, color = "#FFF", bkgdColor = "#000", stat = "1") => <StatTitle text={text} color={color} bkgdColor={bkgdColor} stat={stat}></StatTitle>,
};
  
export default utils;