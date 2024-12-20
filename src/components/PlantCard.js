import React, { useState } from "react";

function PlantCard({ plant }) {
  const [isSoldOut, setIsSoldOut] = useState(false);

  
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      console.log("Submitting new plant:", newPlant);
      {isSoldOut ? (
        <button
          onClick={() =>{
            setIsSoldOut(false);
          }} 

        >
          Out Of Stock
        </button>
      ) : (
        <button
          className="primary"
          onClick={() => {
            
            setIsSoldOut(true);
          }}
        
        >
          In Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;
