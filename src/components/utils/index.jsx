import React from "react";

import iconUtils from "./iconUtils";
import tooltipsUtils from "./tooltipsUtil";
import abilityGateUtils from "./gateUtils";
import titleUtils from "./titleUtils";

const utils = {
    ...iconUtils,
    ...abilityGateUtils,
    ...titleUtils,
    ...tooltipsUtils,
};


//const createTooltip = (name, index) => utils.createTooltip(name, index, updateComponent)

export default {...utils};