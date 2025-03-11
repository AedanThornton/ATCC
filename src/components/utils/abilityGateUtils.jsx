import React from "react";

const AbilityGate = ({ icon, value }) => {

    const link = `./src/assets/icons/${icon}.svg`

    let iconAdjustment = 0
    switch (icon){
        case "Ambrosia":
            iconAdjustment = 5
            break;
    }

    const gateXOffset = 2
    const gateYOffset = 4
    const gateHeight = 37 - gateYOffset
    const gateWidth = 105 - gateXOffset + iconAdjustment
    const gateArrow = 12
    const gateSplitPoint = gateWidth * 0.45
    const gateSplitSize = 4

    const iconPoints = `${gateXOffset} ${gateHeight/2 + gateYOffset},
                        ${gateArrow + gateXOffset} ${gateYOffset}, 
                        ${(gateWidth - gateSplitPoint) - gateSplitSize + gateXOffset + iconAdjustment/2} ${gateYOffset}
                        ${gateSplitPoint - gateSplitSize + gateXOffset + iconAdjustment/2} ${gateHeight + gateYOffset}
                        ${gateArrow + gateXOffset} ${gateHeight + gateYOffset}`

    const valuePoints = `${(gateWidth - gateSplitPoint) + gateSplitSize + gateXOffset + iconAdjustment/2} ${gateYOffset},
                        ${gateWidth - gateArrow + gateXOffset} ${gateYOffset}, 
                        ${gateWidth + gateXOffset} ${gateHeight/2 + gateYOffset}, 
                        ${gateWidth - gateArrow + gateXOffset} ${gateHeight + gateYOffset}
                        ${gateSplitPoint + gateSplitSize + gateXOffset + iconAdjustment/2} ${gateHeight + gateYOffset}`

    const iconPolygon = (
        <polygon 
                x="0" 
                y="0" 
                width="120" 
                height="40" 
                stroke="#FFF"
                strokeWidth="2"
                fill="none"
                points={iconPoints}
        />
    )

    const valuePolygon = (
        <polygon 
                x="0" 
                y="0" 
                width="120" 
                height="40" 
                stroke="#FFF"
                strokeWidth="2"
                fill="none"
                points={valuePoints}
        />
    )

    const iconX = 18 + iconAdjustment/2
    const iconDisplay = (
        <image className="invertible" xlinkHref={link} width="22" height="22" x={iconX} y="10" />  
    )

    const textX = 65 + (iconAdjustment*2)/2
    const textDisplay = (
        <text 
            x={textX} 
            y="29.5" 
            fontSize="26" 
            fontWeight="bold" 
            fill="#FFF"
        >
            {value}
        </text>
    )

    return (
        <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" className="ability-gate-svg">
            {iconPolygon}
            {valuePolygon}
            {iconDisplay}
            {textDisplay}
        </svg>
    );
};

const utils = {
    createAbilityGate: (icon, value) => <AbilityGate icon={icon} value={value}></AbilityGate>
};
  
export default utils;