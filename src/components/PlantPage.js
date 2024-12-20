// Import dependencies and components
import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

// Component: PlantPage
function PlantPage() {
  // State variables
  const [plants, setPlants] = useState([]); // List of plants
  const [searchText, setSearchText] = useState(""); // Search input value

  // Fetch data on initial render
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  // Filter plants based on search text
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Handle adding a new plant
  function handleAddPlant(newPlant) {
    // Generate a new unique ID
    const newId =
      plants.length > 0 ? Math.max(...plants.map((p) => Number(p.id))) + 1 : 1;
    const plantWithId = { ...newPlant, id: newId };

    // Send POST request to add the new plant
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantWithId),
    })
      .then((res) => res.json())
      .then((savedPlant) => {
        // Update state with the new plant
        setPlants((prevPlants) => [...prevPlants, savedPlant]);
      });
  }

  // Render
  return (
    <main>
      {/* Form to add a new plant */}
      <NewPlantForm onAddPlant={handleAddPlant} />

      {/* Search bar to filter plants */}
      <Search searchText={searchText} onSearchChange={setSearchText} />

      {/* Display the filtered list of plants */}
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
