import AutoSizedSVG from "./AutoSizedSVG";

const icons = {}
const modules = import.meta.glob("/src/assets/icons/*.svg", { eager: true });

for (const path in modules) {
    const key = path.split("/").pop().replace(".svg", ""); // Extract filename
    icons[key] = modules[path].default;
}

const AbilityGate = ({ type = "ability", icon, value, fill = "#FFF", icon2 = undefined, comboGate = undefined, value2 = undefined }) => {
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
    const link2 = icon2 ? icons[icon2] : undefined

    const gateXOffset = 0
    const gateYOffset = 0
    const gateHeight = 32
    const gateWidth = 105 + iconAdjustment + (icon2 ? iconSize + 5 : 0) + (comboGate === "OR" ? iconSize : 0)
    const gateArrow = 12
    const gateIncline = 10
    const gateSplitPoint = 46 + (comboGate === "OR" ? iconSize : 0)
    const gateSplitSize = 5

    const ORwidth = comboGate === "OR" ? 65 : 0
    
                        /*
                        --ICON--
                        leftmost
                        top left
                        top right
                        bottom right
                        bottom left

                        --VALUE--
                        top left
                        top right
                        rightmost
                        bottom right
                        bottom left
                        */

    const iconPoints = `${gateXOffset} ${gateYOffset + gateHeight/2},
                        ${gateXOffset + gateArrow} ${gateYOffset},
                        ${gateXOffset + gateWidth - gateSplitPoint - gateSplitSize} ${gateYOffset},
                        ${gateXOffset + gateWidth - gateSplitPoint - gateSplitSize - gateIncline} ${gateYOffset + gateHeight},
                        ${gateXOffset + gateArrow} ${gateYOffset + gateHeight}`

    const valuePoints = `${gateXOffset + gateWidth - gateSplitPoint + ORwidth} ${gateYOffset},
                        ${gateXOffset + gateWidth - gateArrow + ORwidth} ${gateYOffset}, 
                        ${gateXOffset + gateWidth + ORwidth} ${gateYOffset + gateHeight/2}, 
                        ${gateXOffset + gateWidth - gateArrow + ORwidth} ${gateYOffset + gateHeight},
                        ${gateXOffset + gateWidth - gateSplitPoint - gateIncline + ORwidth} ${gateYOffset + gateHeight}`

    const dividerPoints = `${gateXOffset + gateWidth - gateSplitPoint - gateSplitSize} ${gateYOffset},
                        ${gateXOffset + gateWidth - gateSplitPoint - gateSplitSize - gateIncline} ${gateYOffset + gateHeight},
                        ${gateXOffset + gateWidth - gateSplitPoint} ${gateYOffset},
                        ${gateXOffset + gateWidth - gateSplitPoint - gateIncline} ${gateYOffset + gateHeight}`

    const ORSpacerPoints = `${gateXOffset + gateWidth - gateSplitPoint} ${gateYOffset},
                        ${gateXOffset + gateWidth - gateSplitPoint + ORwidth - gateSplitSize} ${gateYOffset},
                        ${gateXOffset + gateWidth - gateSplitPoint - gateIncline + ORwidth - gateSplitSize} ${gateYOffset + gateHeight},
                        ${gateXOffset + gateWidth - gateSplitPoint - gateIncline} ${gateYOffset + gateHeight}`
    

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

    const dividerPolygon = (
        <polygon 
                x="0" 
                y="0" 
                width="120" 
                height="40" 
                stroke="#FFF"
                strokeWidth="3"
                fill={fill}
                points={dividerPoints}
        />
    )

    const ORSpacerPolygon = (
        <polygon 
                x="0" 
                y="0" 
                width="120" 
                height="40" 
                stroke="#FFF"
                strokeWidth="3"
                fill={fill}
                points={ORSpacerPoints}
        />
    )

    const iconX = gateXOffset + gateWidth - gateSplitPoint - gateSplitSize - gateIncline - iconSize - (icon2 ? iconSize + 8 : 0) - 5
    const iconY = gateYOffset + gateHeight/2 - iconSize/2
    const gateDisplay = (
    <g transform={`translate(${iconX}, ${iconY})`}>
        <image
        filter="url(#invert)" //#invert filter is in AutoSizedSVG.jsx
        xlinkHref={link}
        width={iconSize}
        height={iconSize}
        />

        {comboGate && (
        <text
            x={comboGate === "&" ? iconSize + 6 : iconSize * 1.75} // AND vs OR gate spacing
            y={comboGate === "&" ? iconSize * 0.75 : 14} // AND vs OR gate spacing
            fontSize={comboGate === "&" ? 20 : 26} // AND vs OR gate font size
            fontWeight="bold"
            fill="#FFF"
            textAnchor="middle"
            dominantBaseline="middle"
        >
            {comboGate === "&" ? comboGate : value}
        </text>
        )}

        {comboGate === "&" && link2 && (
        <image
            filter="url(#invert)" //#invert filter is in AutoSizedSVG.jsx
            xlinkHref={link2}
            width={iconSize}
            height={iconSize}
            x={iconSize + 12} // offset second icon
        />
        )}
    </g>
    );

    const textX = gateWidth - gateSplitPoint + 5
    const textY = gateYOffset + gateHeight/2 + 10
    const textDisplay = (
        <text 
            x={textX} 
            y={textY} 
            fontSize="26" 
            fontWeight="bold" 
            fill="#FFF"
        >
            {comboGate === "OR" ? "OR" : value}
        </text>
    )

    const rightGateX = gateWidth - gateSplitPoint + 5 + ORwidth
    const rightGateDisplay = link2 && (
    <g transform={`translate(${rightGateX}, ${iconY})`}>
        <image
        filter="url(#invert)" //#invert filter is in AutoSizedSVG.jsx
        xlinkHref={link2}
        width={iconSize}
        height={iconSize}
        />

        {comboGate && (
        <text
            x={iconSize * 1.75}
            y={14}
            fontSize={26}
            fontWeight="bold"
            fill="#FFF"
            textAnchor="middle"
            dominantBaseline="middle"
        >
            {value2}
        </text>
        )}
    </g>
    );

    return type === "power" ? (
        <AutoSizedSVG>
            {dividerPolygon}
            {gateDisplay}
            {textDisplay}
        </AutoSizedSVG>
    ) : comboGate === "OR" ? (
        <AutoSizedSVG>
            {iconPolygon}
            {ORSpacerPolygon}
            {valuePolygon}
            {gateDisplay}
            {textDisplay}
            {rightGateDisplay}
        </AutoSizedSVG>
    ) : (
        <AutoSizedSVG>
            {iconPolygon}
            {valuePolygon}
            {gateDisplay}
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

export const createGate = (gate = [], value = [], fill = "none", type = "ability") => {
    return value[0]
        ? <AbilityGate type={type} icon={gate[0]} value={value[0]} fill={fill} icon2={gate[1] || undefined} comboGate={gate[2] || undefined} value2={value[1] || undefined} /> 
        : <AbilityTextGate text={gate[0]} color="white" bkgdColor={fill} />
}