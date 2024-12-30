import React, { useState } from "react";
import Navigation from "../components/Navigation";
import HomeMain from "../components/HomeMain";
import Footer from "../components/Footer-main";
import ActivityCarousel from "../components/ActivityCarousel";
import { NavLink } from "react-router-dom";

// Fonction pour normaliser les caractères spéciaux (enlever les accents)
const normalizeString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Supprime les accents
};

const Home = () => {
  const [city, setCity] = useState("");

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

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
              value={city}
              onChange={handleInputChange}
            />
            <NavLink to={`/search/${normalizeString(city).toLowerCase()}`}>
              <button className="search-button">Rechercher</button>
            </NavLink>
          </div>

          <ActivityCarousel />
        </div>
        <HomeMain />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
