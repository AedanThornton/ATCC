import iconUtils from "./iconUtils";
import tooltipsUtils from "./tooltipsUtil";
import abilityGateUtils from "./gateUtils";
import SecretOverlay from "./secretUtils";

const utils = {
    ...iconUtils,
    ...tooltipsUtils,
    ...abilityGateUtils,
    updateComponent: (text) => {
        return text.split(" ").map((text, index, array) => {
            const CreatedTooltip = utils.createTooltip(text)
            const lastWord = index === array.length - 1;

            if (typeof(CreatedTooltip) == "string") {
                return <>{utils.inputIconUpdatedComponent(text)}{!lastWord && " "}</>
            }
            else return <>{CreatedTooltip}{!lastWord && " "}</>
        })
    },
    SecretOverlay
};

export default utils;