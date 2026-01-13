import getIcon from "./utils/iconUtils";

export const DiceStack = ({ diceArray, diceType = "Power" }) => {
  const boxHeight = 20 + 5 * Math.floor((diceArray.length + 1) / 2);

  return (
    <span className="power-dice-group"
      style={{
        display: diceArray.length > 1 ? "inline-flex" : "inline",
        minHeight: `${boxHeight}px`
      }}
    >
      {diceArray.map((src, i, array) => {
        const depth = i;
        const dir = i % 2 === 0 ? -1 : 1; // left/right alternating

        const scale = 1 - (depth * 0.05); // shrink each layer
        let x = dir * (9 - depth); // zig-zag offset        
        const y = -8 * Math.floor(depth / 2) * scale - 2 * depth + 4 * Math.floor((array.length - 1) / 2); // push upward in pairs

        if (src === "Power" || array.length < 2) return getIcon(src, diceType, i + src, `1.5em`);
        if (i === array.length - 1 && dir === -1) x = 0;

        return (
          <div
            key={i}
            className="power-die"
            style={{
              zIndex: 100 - depth,
              transform: `translate(${x}px, ${y}px) scale(${-dir}, 1)`
            }}
          >
            {getIcon(src, diceType, i + src, `${(1 + (0.1 * (3 - Math.floor(depth / 2)))) * scale}em`)}
          </div>
        );
      })}
    </span>
  );
};
