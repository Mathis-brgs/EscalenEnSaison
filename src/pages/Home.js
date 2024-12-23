import React from "react";
import Navigation from "../components/Navigation";

import HomeMain from "../components/HomeMain";

const Home = () => {
  return (
    <div className="Home">
      <div className="homeHeader">
        <Navigation />
        <div className="homeHeaderSearch">
          <h1>
            Organisez <br /> votre voyage idéal
          </h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Choisissez une Ville"
              className="search-input"
            />
            <button className="search-button">Rechercher</button>
          </div>
          <div className="activities-container"></div>
        </div>
        <HomeMain />
      </div>
    </div>
  );
};

export default Home;
