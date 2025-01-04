import React, { useState } from "react";
import Navigation from "../components/Navigation";
import SearchBarA from "../components/SearchBarActivities";
import ActivityCard from "../components/ActivityCard";
import ActivityFilter from "../components/ActivityFilter";

const Search = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const onActivitySelect = (activity) => {
    setSelectedActivity(activity); // Met à jour l'état local ou contexte
    console.log("Activité sélectionnée :", activity);
  };

  return (
    <div>
      <Navigation />
      <SearchBarA />
      <ActivityFilter onSelect={onActivitySelect} />
      <ActivityCard selectedActivity={selectedActivity} />
    </div>
  );
};

export default Search;
