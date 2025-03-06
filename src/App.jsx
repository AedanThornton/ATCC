import React from "react";
import GearList from "./components/GearCard/GearCard";

const App = () => {
  return (
    <div className="app">
      <h1>Gear Display</h1>
      <GearList /> {/* This will render the list of gear cards */}
    </div>
  );
};

export default App;