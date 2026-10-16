import { useRef, useState } from "react";

function DragInput({ value = 0, setValue = ()=>{} }) {
  const min = 0, max = 9
  const lastY = useRef(null);
  const accumulated = useRef(0);

  function handlePointerDown(e) {
    lastY.current = e.clientY;
    accumulated.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (lastY.current === null) return;

    accumulated.current += lastY.current - e.clientY;
    lastY.current = e.clientY;

    const threshold = 30;
    const steps = Math.trunc(accumulated.current / threshold);

    if (steps !== 0) {
      setValue(v => Math.max(min, Math.min(max, v + steps)));
      accumulated.current %= threshold;
    }
  }

  function handlePointerUp() {
    lastY.current = null;
  }

  return (
    <div
      onChange={e => {
        const n = Number(e.target.value);
        if (e.target.value !== "") {
          setValue(Math.max(min, Math.min(max, n)));
        }
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: "none" }}
    >
      {value}
    </div>
  );
}

export default DragInput;