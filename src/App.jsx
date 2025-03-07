import React from "react";
import GearList from "./components/GearList";
import "./styles/global.css";
import "./styles/main.css";

const App = () => {
  return (
    <div className="app">
      <h1>ATCC</h1>
      <div className="card-list">
        <GearList /> {/* Renders the list of gear cards */}
      </div>
    </div>
  );
};

export default App;