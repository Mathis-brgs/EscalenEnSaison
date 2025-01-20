import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Connexion from "./Connexion";
import UserPopUp from "./UserPopUp";
import { useCity } from "../contexts/CityContext";
import { useSeason } from "../contexts/SeasonContext";
import { useActivities } from "../contexts/ActivitiesContext";
import { useAuth } from "../contexts/authContext/index";

const Navigation = () => {
  const { currentUser } = useAuth();
  const [showLinks, setShowLinks] = useState(false);
  const [isConnexionPopupOpen, setConnexionPopupOpen] = useState(false);
  const [isUserPopupOpen, setUserPopupOpen] = useState(false);
  const { setSelectedCity } = useCity();
  const { setSelectedSeason } = useSeason();
  const { setSelectedActivities } = useActivities();
  const menuRef = useRef(null);

  const handleCloseConnexionPopup = () => {
    setConnexionPopupOpen(false);
  };

  const handleCloseUserPopup = () => {
    setUserPopupOpen(false);
  };

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleResetFilters = () => {
    setSelectedCity("");
    setSelectedSeason("Toutes");
    setSelectedActivities("");
  };

  // Ferme le menu lorsqu'un clic est détecté en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLinks(false); // fermer le menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`navigation ${showLinks ? "show-nav" : "hive-nav"}`}
      ref={menuRef}
    >
      <NavLink to="/" onClick={handleResetFilters}>
        <div className="logo-nav">Escale en saison</div>
      </NavLink>

      <ul className="navigation-links">
        <li className="fav">
          <i className="fa-solid fa-heart fa-xl"></i>
        </li>

        {!currentUser && (
          <div>
            <li
              className="connexion"
              onClick={() => setConnexionPopupOpen(true)}
            >
              Connexion
            </li>
            {isConnexionPopupOpen && (
              <Connexion onClose={handleCloseConnexionPopup} />
            )}
          </div>
        )}

        {currentUser && (
          <div className="userInfos" onClick={() => setUserPopupOpen(true)}>
            <li className="userLogo">
              <i className="fa-solid fa-user fa-xl"></i>
            </li>
            {isUserPopupOpen && <UserPopUp onClose={handleCloseUserPopup} />}
          </div>
        )}

        <ul className="navbar-links">
          {!currentUser && (
            <div className="button_mobile_CI">
              <li
                className="navbar-items connexion-item"
                onClick={() => {
                  setConnexionPopupOpen(true);
                  setShowLinks(false);
                }}
              >
                Connexion
              </li>
            </div>
          )}

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
            <NavLink to="/TauxDeChange">Taux de changes</NavLink>
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
