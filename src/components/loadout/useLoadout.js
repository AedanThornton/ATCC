import { useState } from "react";

export function useLoadout() {
  const [slotStates, setSlotStates] = useState({
    Armor0: {
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
      exhausted: false,
      discarded: false,
      counters: {
        ambrosia: 0,
        midas: 0,
        generic: 0,
        energy: 0,
      }
    },
    Titan: {}
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