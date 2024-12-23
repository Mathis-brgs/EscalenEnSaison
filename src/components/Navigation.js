import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [showLinks, setShowLinks] = useState(false);
  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  return (
    <nav className={`navigation ${showLinks ? "show-nav" : "hive-nav"} `}>
      <NavLink to="/">
        <div className="logo-nav">Escale en saison</div>
      </NavLink>
      <ul className="navigation-links">
        <li className="fav">
          <i class="fa-solid fa-heart fa-xl"></i>
        </li>
        <li className="connexion">Connexion</li>

        <ul className="navbar-links">
          <li className="navbar-items">
            <NavLink to="/aboutJapan">Japon</NavLink>
          </li>

          <li className="navbar-items">
            <NavLink to="/">Villes</NavLink>
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
            <NavLink to="/">Comparitif de vols</NavLink>
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
