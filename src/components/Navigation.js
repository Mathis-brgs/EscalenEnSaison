import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Connexion from "./Connexion"; // Notez l'import sans accolades.
import { useCity } from "../contexts/CityContext"; // Import du contexte pour la ville
import { useSeason } from "../contexts/SeasonContext";

const Navigation = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { setSelectedCity } = useCity(); // Utilisation du contexte pour la ville
  const { setSelectedSeason } = useSeason();

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleResetFilters = () => {
    setSelectedCity(""); // Réinitialiser la ville sélectionnée
    setSelectedSeason("Toutes"); // Réinitialiser la saison sélectionnée
  };

  return (
    <nav className={`navigation ${showLinks ? "show-nav" : "hive-nav"} `}>
      <NavLink to="/" onClick={handleResetFilters}>
        <div className="logo-nav">Escale en saison</div>
      </NavLink>
      <ul className="navigation-links">
        <li className="fav">
          <i className="fa-solid fa-heart fa-xl"></i>
        </li>
        <div>
          <li className="connexion" onClick={() => setPopupOpen(true)}>
            Connexion
          </li>
          {isPopupOpen && <Connexion onClose={handleClosePopup} />}
        </div>
        <ul className="navbar-links">
          <li className="navbar-items">
            <NavLink to="/aboutJapan">Japon</NavLink>
          </li>
          <li className="navbar-items">
            <NavLink to="/search">Activités</NavLink>
          </li>
          <li className="navbar-items-fav">
            <NavLink to="/">Favoris</NavLink>
          </li>
          <li className="navbar-items">
            <NavLink to="/">Conseils Voyageurs</NavLink>
          </li>
          <li className="navbar-items">
            <NavLink to="/">Taux de changes</NavLink>
          </li>
          <li className="navbar-items">
            <NavLink to="/">Comparatif de vols</NavLink>
          </li>
        </ul>
        <button className="burger-nav" onClick={handleShowLinks}>
          <span className="burger-bar"></span>
        </button>
      </ul>
    </nav>
  );
};

export default Navigation;
