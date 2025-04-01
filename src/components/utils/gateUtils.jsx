import React from "react";

const icons = {}
const modules = import.meta.glob("/src/assets/icons/*.svg", { eager: true });

for (const path in modules) {
    const key = path.split("/").pop().replace(".svg", ""); // Extract filename
    icons[key] = modules[path].default;
}

const AbilityGate = ({ icon, value }) => {

    const link = icons[icon]

    let iconAdjustment = 0
    let iconSize = 22
    switch (icon){
        case "Ambrosia":
            iconAdjustment = 5
            iconSize = 35
            break;
    }

    const gateXOffset = 2
    const gateYOffset = 4
    const gateHeight = 37 - gateYOffset
    const gateWidth = 105 - gateXOffset + iconAdjustment
    const gateArrow = 12
    const gateSplitPoint = gateWidth * 0.45
    const gateSplitSize = 1

    const iconPoints = `${gateXOffset} ${gateHeight/2 + gateYOffset},
                        ${gateArrow + gateXOffset} ${gateYOffset}, 
                        ${(gateWidth - gateSplitPoint) - gateSplitSize + gateXOffset + iconAdjustment/2} ${gateYOffset},
                        ${gateSplitPoint - gateSplitSize + gateXOffset + iconAdjustment/2} ${gateHeight + gateYOffset},
                        ${gateArrow + gateXOffset} ${gateHeight + gateYOffset}`

    const valuePoints = `${(gateWidth - gateSplitPoint) + gateSplitSize + gateXOffset + iconAdjustment/2} ${gateYOffset},
                        ${gateWidth - gateArrow + gateXOffset} ${gateYOffset}, 
                        ${gateWidth + gateXOffset} ${gateHeight/2 + gateYOffset}, 
                        ${gateWidth - gateArrow + gateXOffset} ${gateHeight + gateYOffset},
                        ${gateSplitPoint + gateSplitSize + gateXOffset + iconAdjustment/2} ${gateHeight + gateYOffset}`

    const iconPolygon = (
        <polygon 
                x="0" 
                y="0" 
                width="120" 
                height="40" 
                stroke="#FFF"
                strokeWidth="3"
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
                strokeWidth="3"
                fill="none"
                points={valuePoints}
        />
    )

    const iconX = 30 - iconSize/2
    const iconY = 20 - iconSize/2
    const iconDisplay = (
        <image className="invertible" xlinkHref={link} width={iconSize} height={iconSize} x={iconX} y={iconY} />  
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

const PowerGate = ({ icon, value }) => {

    const link = icons[icon]

    let iconAdjustment = 0
    let iconSize = 22
    switch (icon){
        case "Ambrosia":
            iconAdjustment = 5
            iconSize = 35
            break;
    }

    const gateXOffset = 8
    const gateYOffset = 0
    const gateHeight = 28 - gateYOffset
    const gateWidth = 105 - gateXOffset + iconAdjustment
    const gateSplitPoint = gateWidth * 0.45
    const gateSplitSize = 1

    const dividerPoints = `${(gateWidth - gateSplitPoint) - gateSplitSize + gateXOffset + iconAdjustment/2} ${gateYOffset},
                        ${gateSplitPoint - gateSplitSize + gateXOffset + iconAdjustment/2} ${gateHeight + gateYOffset},
                        ${gateSplitPoint + gateSplitSize + gateXOffset + iconAdjustment/2} ${gateHeight + gateYOffset},
                        ${(gateWidth - gateSplitPoint) + gateSplitSize + gateXOffset + iconAdjustment/2} ${gateYOffset}`

    const dividerPolygon = (
        <polygon 
                x="0" 
                y="0" 
                width="120" 
                height="40" 
                stroke="#FFF"
                strokeWidth="2"
                fill="#FFF"
                points={dividerPoints}
        />
    )

    const iconX = 33 - iconSize/2
    const iconY = 14.5 - iconSize/2
    const iconDisplay = (
        <image className="invertible" xlinkHref={link} width={iconSize} height={iconSize} x={iconX} y={iconY} />  
    )

    const textX = 70 + (iconAdjustment*2)/2
    const textDisplay = (
        <text 
            x={textX} 
            y="23.5" 
            fontSize="26" 
            fontWeight="bold" 
            fill="#FFF"
        >
            {value}
        </text>
    )

    return (
        <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" className="ability-gate-svg">
            {dividerPolygon}
            {iconDisplay}
            {textDisplay}
        </svg>
    );
};

const utils = {
    createAbilityGate: (icon, value) => <AbilityGate icon={icon} value={value}></AbilityGate>,
    createPowerGate: (icon, value) => <PowerGate icon={icon} value={value}></PowerGate>
};
  
export default utils;