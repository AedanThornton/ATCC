import React from "react";

const StatTitle = ({ text, stat }) => {

    const lengthAdjustment = 16 * text.length

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
                        ${Width - Arrow + XOffset} ${YOffset}, 
                        ${Width + XOffset} ${Height/2 + YOffset}, 
                        ${Width - Arrow + XOffset} ${Height + YOffset},
                        ${(Width - SplitPoint) + SplitSize + XOffset + lengthAdjustment/2} ${Height + YOffset}`

    const textPolygon = (
        <polygon 
                x="0" 
                y="0" 
                width="120" 
                height="40" 
                stroke="#F9C344"
                strokeWidth="2"
                fill="#F9C344"
                points={iconPoints}
        />
    )

    const valuePolygon = (
        <polygon 
                x="0" 
                y="0" 
                width="120" 
                height="40" 
                stroke="#F9C344"
                strokeWidth="2"
                fill="#F9C344"
                points={valuePoints}
        />
    )

    const statX = 800 / (lengthAdjustment/2)
    const statDisplay = (
        <text 
            x={statX} 
            y="29.5" 
            fontSize="26" 
            fontWeight="bold" 
            fill="#000"
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
            fill="#000"
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
    createStatTitle: (text, stat = 1) => <StatTitle text={text} stat={stat}></StatTitle>,
};
  
export default utils;