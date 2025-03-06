import { useState, useEffect } from "react";
import gameData from "./assets/testData.json"; // Import JSON file

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(gameData); // Load JSON into state
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>My Game Data Site</h1>
      {cards.map((card, index) => (
        <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h2>{card.name}</h2>
          <p>Type: {card.type}</p>
          <p>Damage: {card.damage}</p>
          <p>Effect: {card.effect}</p>
          <p>Cost: {card.cost}</p>
        </div>
      ))}
    </div>
  );
}

export default App;