const icons = {};
const modules = import.meta.glob("/src/assets/icons/*.svg");

const invertibles = [
    "Danger",
    "Fate",
    "Rage",
    "Exhaust",
    "Discard",
    "Reaction",
    "Gear",
    "OneHanded",
    "TwoHanded",
    "ThreeHanded",
    "Support",
    "Armor",
    "Speed"
];

for (const path in modules) {
    const key = path.split("/").pop().replace(".svg", ""); // Extract filename
    modules[path]().then((mod) => {
        icons[key] = mod.default;
    });
}

const utils = {
    getIcon: (name, type = "none", index, size = "1em", padding = "0.1em") => {
        switch (name) {
            case "Red":
                if (type === "Power") {
                    name = "RedPowerDie"
                } else if (type === "Armor") {
                    name = "RedArmorDie"
                }
                break;
            case "Black":
                if (type === "Power") {
                    name = "BlackPowerDie"
                } else if (type === "Armor") {
                    name = "BlackArmorDie"
                }
                break;
            case "White":
                if (type === "Power") {
                    name = "WhitePowerDie"
                } else if (type === "Armor") {
                    name = "WhiteArmorDie"
                }
                break;
            case "1 Hand": name = "OneHanded"; break
            case "2 Hands": name = "TwoHanded"; break
            case "3 Hands": name = "ThreeHanded"; break
        }
        const icon = icons[name];
        return icon ? <img key={name + index} src={icon} style={{height: size, verticalAlign: "middle", paddingBottom: padding}} alt={name} className={`${invertibles.includes(name) ? "invertible" : ""}`}/> : name;
    },
    interpolateIcons: (str, type) => {       
        return str.split(/\b/).map((word, index) => utils.getIcon(word, type, index))
    }
}

const TextWithIcons = ({text, type = "none"}) => <>{utils.interpolateIcons(text, type)}</>

utils["inputIconUpdatedComponent"] = (text, type) => {
    return <TextWithIcons text={text} type={type}/>;
}

export default utils