import AutoSizedSVG from "./AutoSizedSVG";

const icons = {}
const modules = import.meta.glob("/src/assets/icons/*.svg", { eager: true });

for (const path in modules) {
    const key = path.split("/").pop().replace(".svg", ""); // Extract filename
    icons[key] = modules[path].default;
}

const AbilityGate = ({ icon, value, fill, icon2 = undefined, comboGate = undefined }) => {
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
    const gateWidth = 103 + iconAdjustment + (icon2 ? iconSize + 5 : 0)
    const gateArrow = 12
    const gateIncline = 10
    const gateSplitPoint = 46
    const gateSplitSize = 5
    
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

    const valuePoints = `${gateXOffset + gateWidth - gateSplitPoint} ${gateYOffset},
                        ${gateXOffset + gateWidth - gateArrow} ${gateYOffset}, 
                        ${gateXOffset + gateWidth} ${gateYOffset + gateHeight/2}, 
                        ${gateXOffset + gateWidth - gateArrow} ${gateYOffset + gateHeight},
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

    const iconX = gateXOffset + gateWidth - gateSplitPoint - gateSplitSize - gateIncline - iconSize - (icon2 ? iconSize + 5 : 0) - 5
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
            x={iconSize + 6}
            y={iconSize * 0.75}
            fontSize="20"
            fontWeight="bold"
            fill="#FFF"
            textAnchor="middle"
            dominantBaseline="middle"
        >
            {comboGate}
        </text>
        )}

        {link2 && (
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
            {value}
        </text>
    )

    return (
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
    if (Array.isArray(gate)) {
        return value ? <AbilityGate icon={gate[0]} value={value} fill={fill} icon2={gate[1]} comboGate={gate[2]} /> : <AbilityTextGate text={gate} color="white" bkgdColor={fill} icon2={gate[1]} comboGate={gate[2]} />
    }
    return value ? <AbilityGate icon={gate} value={value} fill={fill} /> : <AbilityTextGate text={gate} color="white" bkgdColor={fill} />
}
export const createPowerGate = (icon, value) => <PowerGate icon={icon} value={value} />