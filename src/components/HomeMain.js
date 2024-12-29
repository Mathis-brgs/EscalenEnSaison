import React from "react";
import CityCard from "./CityCard";
import ArticleCard from "./ArticleCard";

const HomeMain = () => {
  return (
    <div className="main-home">
      <h3 className="home-h3">De nombreuses villes à visiter</h3>
      <CityCard />
      <div className="séparation"></div>
      <h4>Conseils Voyageurs</h4>
      <ArticleCard />
    </div>
  );
};

export default HomeMain;
