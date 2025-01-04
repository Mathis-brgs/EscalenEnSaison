import React from "react";
import Navigation from "../components/Navigation";
import SearchBarA from "../components/SearchBarActivities";
import ActivityCard from "../components/ActivityCard";
import ActivityFilter from "../components/ActivityFilter";

const Search = () => {
  return (
    <div>
      <Navigation />
      <SearchBarA />
      <ActivityFilter />
      <ActivityCard />
    </div>
  );
};

export default Search;
