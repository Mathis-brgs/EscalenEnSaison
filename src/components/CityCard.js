import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { NavLink } from "react-router-dom";
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

const CityCard = () => {
  //récupération des infos sur firebase
  const getCities = async () => {
    const citiesCol = collection(db, "japon");
    const citiesSnapshot = await getDocs(citiesCol);
    const citiesData = citiesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setCities(citiesData.reverse()); // Inverser l'ordre des articles
  };
  useEffect(() => {
    getCities();
  }, []);
  const [cities, setCities] = useState([]);
  const [visibleCities, setVisibleCities] = useState(3); // Nombre initial de villes affichées

  const showAllCities = () => {
    setVisibleCities(cities.length); // Afficher tous les articles
  };

  return (
    <div className="city-cards">
      <ul>
        {cities.slice(0, visibleCities).map(
          (
            cities,
            index //afficher le nombres de cards choisis
          ) => (
            <NavLink to={`/ville/${cities.id}`}>
              <li key={index}>
                <div className="cityImg">
                  <img src={cities.img} alt={cities.id} />
                  <h3 className="cityName">{cities.id}</h3>
                </div>
              </li>
            </NavLink>
          )
        )}
      </ul>
      {visibleCities < cities.length && ( //bouton pour afficher toutes les cards
        <div className="show-more-container">
          <button onClick={showAllCities} className="main-button">
            Voir plus de villes
          </button>
        </div>
      )}
    </div>
  );
};

export default CityCard;
