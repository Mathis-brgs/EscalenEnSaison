import React from "react";
import Navigation from "../components/Navigation";
import SearchBarA from "../components/SearchBarActivities";
import ActivityCard from "../components/ActivityCard";

const Search = () => {
  return (
    <div>
      <Navigation />
      <SearchBarA />
      <ActivityCard />
    </div>
  );
};

export default Search;
