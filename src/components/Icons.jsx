const icons = {};
const modules = import.meta.glob("/src/assets/icons/*.svg");

for (const path in modules) {
    const key = path.split("/").pop().replace(".svg", ""); // Extract filename
    modules[path]().then((mod) => {
        icons[key] = mod.default;
    });
}

const getIcon = (name, size = 16) => {
    const IconComponent = icons[name];
    return IconComponent ? <img src={IconComponent} width={size} height={size} alt={name} /> : name;
};

const checkForIcon = (str) => {
    words = str.split();
    new_words = ""
    new_words += words.map(getIcon(word))
    return new_words
}

console.log(checkForIcon("Ignore Exhaust cost of Block"));


export default getIcon