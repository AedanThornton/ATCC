import React from "react";

import iconUtils from "./iconUtils";
import tooltipsUtils from "./tooltipsUtil";
import abilityGateUtils from "./gateUtils";
import titleUtils from "./titleUtils";

const updateComponent = (text, superindex) => {
    console.log(text)
    return text.split(" ").map((word, index, array) => {
        const CreatedTooltip = utils.createTooltip(word, `${superindex}-${index}`)
        const isLastWord = index === array.length - 1;

        const skips = ["Ambrosia"]
        if (skips.includes(word)) return <React.Fragment key={`${superindex}-${index}`}>{word}{!isLastWord && " "}</React.Fragment>

        if (typeof(CreatedTooltip) == "string") {
            return <React.Fragment key={`${superindex}-${index}`}>{utils.inputIconUpdatedComponent(word, undefined, `${superindex}-${index}`)}{!isLastWord && " "}</React.Fragment>
        }
        else return <React.Fragment key={`${superindex}-${index}`}>{CreatedTooltip}{!isLastWord && " "}</React.Fragment>
    })
}

const utils = {
    ...iconUtils,
    ...abilityGateUtils,
    ...titleUtils,
    updateComponent,
    ...tooltipsUtils,
};


const createTooltip = (name, index) => utils.createTooltip(name, index, updateComponent)

export default {...utils, createTooltip};