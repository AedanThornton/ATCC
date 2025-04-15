import React from "react";

import iconUtils from "./iconUtils";
import tooltipsUtils from "./tooltipsUtil";
import abilityGateUtils from "./gateUtils";
import titleUtils from "./titleUtils";

const updateComponent = (text, superindex) => {
    return text.split(" ").map((word, index, array) => {
        const CreatedTooltip = utils.createTooltip(word, `${superindex}-${index}`)
        const lastWord = index === array.length - 1;

        if (typeof(CreatedTooltip) == "string") {
            return <React.Fragment key={`${superindex}-${index}`}>{utils.inputIconUpdatedComponent(word, undefined, `${superindex}-${index}`)}{!lastWord && " "}</React.Fragment>
        }
        else return <React.Fragment key={`${superindex}-${index}`}>{CreatedTooltip}{!lastWord && " "}</React.Fragment>
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