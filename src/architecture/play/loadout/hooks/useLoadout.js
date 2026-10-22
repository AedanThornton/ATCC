import { useState } from "react";

export function useLoadout() {
  const [slotStates, setSlotStates] = useState({
    Armor0: {
      highlighted: false,
      exhausted: false,
      discarded: false,
      counters: {
        ambrosia: 0,
        midas: 0,
        generic: 0,
        energy: 0,
      }
    },
    Attachment0: {
      highlighted: false,
      exhausted: false,
      discarded: false,
      counters: {
        ambrosia: 0,
        midas: 0,
        generic: 0,
        energy: 0,
      }
    },
    Attachment1: {
      highlighted: false,
      exhausted: false,
      discarded: false,
      counters: {
        ambrosia: 0,
        midas: 0,
        generic: 0,
        energy: 0,
      }
    },
    Attachment2: {
      highlighted: false,
      exhausted: false,
      discarded: false,
      counters: {
        ambrosia: 0,
        midas: 0,
        generic: 0,
        energy: 0,
      }
    },
    Mnemos0: {
      highlighted: false,
      exhausted: false,
      discarded: false,
      counters: {
        ambrosia: 0,
        midas: 0,
        generic: 0,
        energy: 0,
      }
    },
    Mnemos1: {
      highlighted: false,
      exhausted: false,
      discarded: false,
      counters: {
        ambrosia: 0,
        midas: 0,
        generic: 0,
        energy: 0,
      }
    },
    OneHanded0: {
      highlighted: false,
      exhausted: false,
      discarded: false,
      counters: {
        ambrosia: 0,
        midas: 0,
        generic: 0,
        energy: 0,
      }
    },
    OneHanded1: {
      highlighted: false,
      exhausted: false,
      discarded: false,
      counters: {
        ambrosia: 0,
        midas: 0,
        generic: 0,
        energy: 0,
      }
    },
    Support0: {
      highlighted: false,
      exhausted: false,
      discarded: false,
      counters: {
        ambrosia: 0,
        midas: 0,
        generic: 0,
        energy: 0,
      }
    },
    Support1: {
      highlighted: false,
      exhausted: false,
      discarded: false,
      counters: {
        ambrosia: 0,
        midas: 0,
        generic: 0,
        energy: 0,
      }
    },
    Titan: {
      highlighted: false,
    }
  })

  function setState(slot, state, value) {
    if (!(slot in slotStates)) return
    if (!(state in slotStates[slot])) return

    setSlotStates(prev => {
      return {
        ...prev,
        [slot]: {
          ...prev[slot],
          [state]: value
        }
      }
    })
  }

  function addSlot(slot) {
    setSlotStates(prev => ({
      ...prev,
      [slot]: {
        highlighted: false,
        exhausted: false,
        discarded: false,
        counters: {
          ambrosia: 0,
          midas: 0,
          generic: 0,
          energy: 0,
        }
      }
    }))
  }

  function removeSlot(slot) {
    setSlotStates(prev => {
      const newSlotStates = { ...prev };
      delete newSlotStates[slot];
      return newSlotStates
    })
  }

  /*
    if ((state === "exhausted" || state === "discarded") && typeof value !== "boolean") {
      console.error("Invalid data type attempted to be set for ", slot, " -- ", state)
    } 
  */

  function plusCounter(slot, counterName) {
    if (!(slot in slotStates)) return
    if (!("counters" in slotStates[slot])) {
      console.error("Slot type ", slot, " does not accept counters")
    }

    setState(slot, "counters", slotStates[slot].counters[counterName] + 1)
  }

  function minusCounter(slot) {
    if (!(slot in slotStates)) return
    if (!("counters" in slotStates[slot])) {
      console.error("Slot type ", slot, " does not accept counters")
    }

    setState(slot, "counters", slotStates[slot].counters[counterName] - 1)
  }

  return {
    slotStates,
    setState,
    addSlot, removeSlot,
    plusCounter, minusCounter
  }
}