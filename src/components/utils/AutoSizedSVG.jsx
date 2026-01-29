import { useRef, useLayoutEffect, useState, useEffect } from "react";

function AutoSizedSVG({ children }) {
  const svgRef = useRef(null);
  const [box, setBox] = useState(null);

  //Force safari to retrigger the svg render to compute the dynamic width
  useEffect(() => {
    const svg = svgRef.current;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // trigger reflow by toggling a trivial style
        svg.style.transform = "scale(1)";
      });
    });
  }, []);

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
      <filter id="invert">
        <feColorMatrix type="matrix" values="-1 0 0 0 1
                                            0 -1 0 0 1
                                            0 0 -1 0 1
                                            0 0 0 1 0"/>
      </filter>
      {children}
    </svg>
  );
}

export default AutoSizedSVG;