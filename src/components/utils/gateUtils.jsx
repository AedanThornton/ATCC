import AutoSizedSVG from "./AutoSizedSVG";

const icons = {}
const modules = import.meta.glob("/src/assets/icons/*.svg", { eager: true });

for (const path in modules) {
    const key = path.split("/").pop().replace(".svg", ""); // Extract filename
    icons[key] = modules[path].default;
}

const AbilityGate = ({ icon, value, fill }) => {
    let iconAdjustment = 0
    let iconSize = 22
    switch (icon){
        case "Ambrosia":
            iconAdjustment = 5
            iconSize = 35
            break;
        case "Labyrinth":
            icon = "Labyrinthians"
            break;
    }

    const link = icons[icon]

    const gateXOffset = 2
    const gateYOffset = 4
    const gateHeight = 37 - gateYOffset
    const gateWidth = 105 - gateXOffset + iconAdjustment
    const gateArrow = 12
    const gateSplitPoint = gateWidth * 0.45
    const gateSplitSize = 1

    const iconPoints = `${gateXOffset} ${gateHeight/2 + gateYOffset},
                        ${gateArrow + gateXOffset} ${gateYOffset}, 
                        ${(gateWidth - gateSplitPoint) - gateSplitSize + gateXOffset} ${gateYOffset},
                        ${gateSplitPoint - gateSplitSize + gateXOffset} ${gateHeight + gateYOffset},
                        ${gateArrow + gateXOffset} ${gateHeight + gateYOffset}`

    const valuePoints = `${(gateWidth - gateSplitPoint) + gateSplitSize + gateXOffset} ${gateYOffset},
                        ${gateWidth - gateArrow + gateXOffset} ${gateYOffset}, 
                        ${gateWidth + gateXOffset} ${gateHeight/2 + gateYOffset}, 
                        ${gateWidth - gateArrow + gateXOffset} ${gateHeight + gateYOffset},
                        ${gateSplitPoint + gateSplitSize + gateXOffset} ${gateHeight + gateYOffset}`

    const iconPolygon = (
        <polygon 
                x="0" 
                y="0" 
                width="120" 
                height="40" 
                stroke="#FFF"
                strokeWidth="3"
                fill={fill}
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
                fill={fill}
                points={valuePoints}
        />
    )

    const iconX = 30 - iconSize/2
    const iconY = 20 - iconSize/2
    const iconDisplay = (
        <image filter="url(#invert)" xlinkHref={link} width={iconSize} height={iconSize} x={iconX} y={iconY} />  
    ) //#invert filter is in AutoSizedSVG.jsx

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
        <AutoSizedSVG>
            {iconPolygon}
            {valuePolygon}
            {iconDisplay}
            {textDisplay}
        </AutoSizedSVG>
    );
};

function getTextWidth(text, font) {
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

const AbilityTextGate = ({ text, color, bkgdColor }) => {
    const lengthAdjustment = 0.85 * getTextWidth(text, "bold 26pt 'Times New Roman'")

    const gateXOffset = 2
    const gateYOffset = 4
    const gateHeight = 37 - gateYOffset
    const gateWidth = 30 - gateXOffset + lengthAdjustment
    const gateArrow = 12

    const textPoints = `${gateXOffset} ${gateHeight/2 + gateYOffset},
                        ${gateArrow + gateXOffset} ${gateYOffset},
                        ${gateWidth - gateArrow + gateXOffset} ${gateYOffset}, 
                        ${gateWidth + gateXOffset} ${gateHeight/2 + gateYOffset}, 
                        ${gateWidth - gateArrow + gateXOffset} ${gateHeight + gateYOffset}, 
                        ${gateArrow + gateXOffset} ${gateHeight + gateYOffset}`

    const textPolygon = (
        <polygon 
                x="0" 
                y="0" 
                width="120" 
                height="40" 
                stroke={color}
                strokeWidth="3"
                fill={bkgdColor}
                points={textPoints}
        />
    )

    const textX = 20
    const textDisplay = (
        <text 
            x={textX} 
            y="29.5" 
            fontSize="26" 
            fontWeight="bold" 
            fill={color}
        >
            {text}
        </text>
    )

    return (
        <AutoSizedSVG>
            {textPolygon}
            {textDisplay}
        </AutoSizedSVG>
    );
}

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

    const dividerPoints = `${(gateWidth - gateSplitPoint) - gateSplitSize + gateXOffset} ${gateYOffset},
                        ${gateSplitPoint - gateSplitSize + gateXOffset} ${gateHeight + gateYOffset},
                        ${gateSplitPoint + gateSplitSize + gateXOffset} ${gateHeight + gateYOffset},
                        ${(gateWidth - gateSplitPoint) + gateSplitSize + gateXOffset} ${gateYOffset}`

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
        <image filter="url(#invert)" xlinkHref={link} width={iconSize} height={iconSize} x={iconX} y={iconY} />  
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
        <AutoSizedSVG>
            {dividerPolygon}
            {iconDisplay}
            {textDisplay}
        </AutoSizedSVG>
    );
};

export const createAbilityGate = (gate, value, fill = "none") => {
    return value ? <AbilityGate icon={gate} value={value} fill={fill} /> : <AbilityTextGate text={gate} color="white" bkgdColor={fill} />
}
export const createPowerGate = (icon, value) => <PowerGate icon={icon} value={value} />