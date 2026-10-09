//Returns a Triskelion element, which is a rendered object that takes in 3 stateful variables for the three stats, and can be right/left clicked to lower/raise the indicated stat
// Also has a "reset" button to set all stats to zero

//When used in a Loadout, parent should get and set state to LocalStorage so it persists on reload

function Triskelion({rageState = 0, rageSetter = ()=>{}, fateState = 0, fateSetter = ()=>{}, dangerState = 0, dangerSetter = ()=>{}}) {

  function resetAll() {
    rageSetter(0)
    fateSetter(0)
    dangerSetter(0)
  }

  return <div className="triskelion">

  </div>
}

export default Triskelion