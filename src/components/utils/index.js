import iconUtils from "./iconUtils";
import tooltipsUtils from "./tooltipsUtil";
import abilityGateUtils from "./abilityGateUtils";

const utils = {
    ...iconUtils,
    ...tooltipsUtils,
    ...abilityGateUtils,
    updateComponent: (text) => {
        const CreatedTooltip = utils.createTooltip(text)
        if (typeof(CreatedTooltip) == "string") {
            return utils.inputIconUpdatedComponent(text)
        }
        else return CreatedTooltip
    },
};

export default utils;