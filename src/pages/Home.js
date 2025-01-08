import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import HomeMain from "../components/HomeMain";
import Footer from "../components/Footer-main";
import ActivityCarousel from "../components/ActivityCarousel";
import { NavLink } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useCity } from "../contexts/CityContext";
import { useActivities } from "../contexts/ActivitiesContext";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJETID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Home = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [cities, setCities] = useState([]);
  const containerRef = useRef(null);

  const { selectedCity, setSelectedCity } = useCity();
  const { setSelectedActivity } = useActivities();

  const [localCity, setLocalCity] = useState(selectedCity);

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
    setLocalCity(city);
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
    const cityToSet = localCity || "Toutes";
    setSelectedCity(cityToSet);
    setSelectedActivity(null);
  };

  return (
    <div className="Home">
      <div className="homeHeader">
        <Navigation />
        <div className="homeHeaderSearch">
          <h1>
            Organisez <br /> votre voyage idéal{" "}
          </h1>
          <div className="search-container" ref={containerRef}>
            <div className="city-selector-wrapper">
              <div
                onClick={toggleOverlay}
                className="city-selector-label search-input"
              >
                {localCity || "Choisissez votre ville"}
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
