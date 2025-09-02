import React from "react";

import iconUtils from "./iconUtils";
import tooltipsUtils from "./tooltipsUtil";
import abilityGateUtils from "./gateUtils";
import titleUtils from "./titleUtils";

const updateComponent = (text, superindex) => {
    return text.split("Icon").map((phrase, index) => {
        const CreatedTooltip = utils.createTooltip(phrase, `${superindex}-${index}`)

        const words = phrase.split(" ")
        const icon = utils.getIcon(words.pop())

        if (typeof(CreatedTooltip) == "string") {
            return <React.Fragment key={`${superindex}-${index}`}>{words.join(" ")} {icon}</React.Fragment>
        }
        else return <React.Fragment key={`${superindex}-${index}`}>{CreatedTooltip}</React.Fragment>
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