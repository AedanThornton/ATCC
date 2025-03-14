import React from "react";
import CardList from "./components/CardList";
import "./styles/global.css";
import "./styles/main.css";

const App = () => {
  return (
    <div className="app">
      <h1>ATCC</h1>
      <div className="card-list-main">
        <CardList />
      </div>
    </div>
  );
};

export default App;