import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useCity } from "../contexts/CityContext";
import { useSeason } from "../contexts/SeasonContext";

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
  const { selectedCity, setSelectedCity } = useCity(); // Utilisation du contexte pour la ville
  const { setSelectedSeason } = useSeason();
  const [openCategory, setOpenCategory] = useState(null);
  const [searchData, setSearchData] = useState({
    country: "Japon",
    city: selectedCity || "Toutes", // Initialiser avec la ville du contexte
    season: "Toutes",
  });

  const [cities, setCities] = useState([]); // Charger les villes depuis Firebase
  const containerRef = useRef(null);

  const countries = [{ label: "Japon" }];
  const seasons = [
    { label: "Toutes" },
    { label: "Printemps" },
    { label: "Été" },
    { label: "Automne" },
    { label: "Hiver" },
  ];

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

  useEffect(() => {
    setSearchData((prev) => ({
      ...prev,
      city: selectedCity || "Toutes",
    }));
  }, [selectedCity]);

  const toggleOverlay = (field) => {
    setOpenCategory((prev) => (prev === field ? null : field));
  };

  const handleSelect = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "city") {
      setSelectedCity(value);
    }

    if (field === "season") {
      setSelectedSeason(value);
    }

    setOpenCategory(null); // Fermer l'overlay après sélection
  };

  // Fermer les overlays quand on clique en dehors
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
      </div>
    </div>
  );
};

export default SearchBarA;
