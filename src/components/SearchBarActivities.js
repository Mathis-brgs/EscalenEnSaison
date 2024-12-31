import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

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

const SearchBarA = () => {
  useEffect(() => {
    const testFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "japon"));
        console.log(
          "Données récupérées :",
          querySnapshot.docs.map((doc) => doc.id)
        );
      } catch (error) {
        console.error("Erreur avec Firebase :", error);
      }
    };
    testFirebase();
  }, []);

  const [openCategory, setOpenCategory] = useState(null);
  const [searchData, setSearchData] = useState({
    country: "Japon",
    city: "Toutes",
    season: "Toutes",
  });

  const [cities, setCities] = useState([]); // Pour charger les villes dynamiquement depuis Firebase
  const containerRef = useRef(null);

  // Données statiques pour Pays et Saisons
  const countries = [{ label: "Japon" }];
  const seasons = [
    { label: "Toutes" },
    { label: "Printemps" },
    { label: "Été" },
    { label: "Automne" },
    { label: "Hiver" },
  ];

  // Récupération des villes depuis Firebase
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "japon"));
        const cityList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
        }));
        setCities([{ id: "Toutes" }, ...cityList]);
      } catch (error) {
        console.error("Erreur lors de la récupération des villes :", error);
      }
    };

    fetchCities();
  }, []);

  const toggleOverlay = (field) => {
    setOpenCategory((prev) => (prev === field ? null : field)); // Basculer ou fermer
  };

  // Sélection d'une option
  const handleSelect = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOpenCategory(null); // Fermer l'overlay après sélection
  };

  // Fermeture des overlays lorsque l'utilisateur clique en dehors
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

  return (
    <div className="search-bar" ref={containerRef}>
      <div className="search-bar__container">
        {/* Pays */}
        <div className="search-bar__field">
          <label>Pays</label>
          <div
            onClick={() => toggleOverlay("country")}
            className="search-bar__input"
          >
            {searchData.country}
          </div>
          {openCategory === "country" && (
            <div className="search-bar__overlay">
              {countries.map((country, index) => (
                <div
                  key={index}
                  className="search-bar__option"
                  onClick={() => handleSelect("country", country.label)}
                >
                  {country.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ville */}
        <div className="search-bar__field">
          <label>Ville</label>
          <div
            onClick={() => toggleOverlay("city")}
            className="search-bar__input"
          >
            {searchData.city}
          </div>
          {openCategory === "city" && (
            <div className="search-bar__overlay">
              {cities.map((city, index) => (
                <div
                  key={index}
                  className="search-bar__option"
                  onClick={() => handleSelect("city", city.id)}
                >
                  {city.id}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saison */}
        <div className="search-bar__field">
          <label>Saison</label>
          <div
            onClick={() => toggleOverlay("season")}
            className="search-bar__input"
          >
            {searchData.season}
          </div>
          {openCategory === "season" && (
            <div className="search-bar__overlay">
              {seasons.map((season, index) => (
                <div
                  key={index}
                  className="search-bar__option"
                  onClick={() => handleSelect("season", season.label)}
                >
                  {season.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bouton Rechercher */}
        <button className="search-bar__button">Rechercher</button>
      </div>
    </div>
  );
};

export default SearchBarA;
