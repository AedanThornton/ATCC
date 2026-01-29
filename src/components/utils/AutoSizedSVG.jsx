import { useRef, useLayoutEffect, useState } from "react";

function AutoSizedSVG({ children }) {
  const svgRef = useRef(null);
  const [box, setBox] = useState(null);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const bbox = svg.getBBox();
    setBox(bbox);
  }, [children]); // re-run when SVG content changes

  return (
    <svg
      ref={svgRef}
      viewBox={
        box
          ? `${box.x} ${box.y} ${box.width} ${box.height}`
          : undefined
      }
      width={box?.width}
      height={box?.height}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

export default AutoSizedSVG;