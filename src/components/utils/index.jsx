import iconUtils from "./iconUtils";
import tooltipsUtils from "./tooltipsUtil";
import abilityGateUtils from "./gateUtils";
import titleUtils from "./titleUtils";

const utils = {
    ...iconUtils,
    ...tooltipsUtils,
    ...abilityGateUtils,
    updateComponent: (text) => {
        return text.split(" ").map((text, index, array) => {
            const CreatedTooltip = utils.createTooltip(text, index)
            const lastWord = index === array.length - 1;

            if (typeof(CreatedTooltip) == "string") {
                return <>{utils.inputIconUpdatedComponent(text, undefined, index)}{!lastWord && " "}</>
            }
            else return <>{CreatedTooltip}{!lastWord && " "}</>
        })
    },
    ...titleUtils
};

export default utils;