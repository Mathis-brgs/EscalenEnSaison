import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import HomeMain from "../components/HomeMain";
import Footer from "../components/Footer-main";
import ActivityCarousel from "../components/ActivityCarousel";
import { NavLink } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useCity } from "../contexts/CityContext"; // Importer le CityContext

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJETID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Home = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [cities, setCities] = useState([]); // Charger les villes depuis Firebase
  const containerRef = useRef(null);

  // Utiliser le contexte pour accéder à la ville sélectionnée
  const { selectedCity, setSelectedCity } = useCity();

  // État local pour la ville sélectionnée temporairement
  const [localCity, setLocalCity] = useState(
    selectedCity || "Choisissez votre ville"
  );

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "japon"));
        const cityList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
        }));
        setCities([{ id: "Toutes" }, ...cityList.reverse()]);
      } catch (error) {
        console.error("Erreur lors de la récupération des villes :", error);
      }
    };

    fetchCities();
  }, []);

  const toggleOverlay = () => {
    setOpenCategory((prev) => (prev === "city" ? null : "city"));
  };

  const handleSelect = (city) => {
    setLocalCity(city); // Met à jour uniquement l'état local
    setOpenCategory(null);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setOpenCategory(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    setSelectedCity(localCity); // Met à jour le contexte uniquement ici
  };

  return (
    <div className="Home">
      <div className="homeHeader">
        <Navigation />
        <div className="homeHeaderSearch">
          <h1>
            Organisez <br /> votre voyage idéal
          </h1>
          <div className="search-container" ref={containerRef}>
            <div className="city-selector-wrapper">
              <div
                onClick={toggleOverlay}
                className="city-selector-label search-input"
              >
                {localCity} {/* Utilise l'état local pour afficher la ville */}
              </div>
              {openCategory === "city" && (
                <div className="city-dropdown-hidden active">
                  {cities.map((city) => (
                    <div
                      key={city.id}
                      className="search-bar__option"
                      onClick={() => handleSelect(city.id)}
                    >
                      {city.id}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <NavLink to={`/search/`}>
              <button className="search-button" onClick={handleSearch}>
                Rechercher
              </button>
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
