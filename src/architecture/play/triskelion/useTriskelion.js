import { useState } from "react";

export function useTriskelion() {
  const [rage, setRage] = useState(0);
  const [fate, setFate] = useState(0);
  const [danger, setDanger] = useState(0);

  function getStatSetter(statname) {
    const statMap = {
      "rage": setRage,
      "fate": setFate,
      "danger": setDanger,
    }
    const empty = () => console.error("Invalid stat name entered for useTriskelion Hook: ", statname);

    return statname.toLowerCase() in statMap ? statMap[statname.toLowerCase()] : empty
  }

  function plusStat(statname, val = 1) {
    const setter = getStatSetter(statname)
    setter(prev => {
      if (prev >= 9) return 9
      return Math.min(prev + val, 9)
    })
  }
  
  function minusStat(statname, val = 1) {
    const setter = getStatSetter(statname)
    setter(prev => {
      if (prev <= 0) return 0
      return Math.max(prev - val, 0)
    })
  }

  function resetStat(statname) {
    const setter = getStatSetter(statname)
    setter(0)
  }

  return {
    rage, fate, danger,
    setRage, setFate, setDanger,
    plusStat, minusStat, resetStat,
    getStatSetter
  }
}