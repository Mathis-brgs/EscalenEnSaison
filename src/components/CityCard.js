import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";

import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpucsBgcuLam24cCJoXnfbPBjvmnHCKTA",
  authDomain: "escaleensaison.firebaseapp.com",
  projectId: "escaleensaison",
  storageBucket: "escaleensaison.firebasestorage.app",
  messagingSenderId: "1034229447699",
  appId: "1:1034229447699:web:9a76c97da164e6a32253e6",
  measurementId: "G-JT9VN0BKLK",
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
            <li key={index}>
              <div className="cityImg">
                <img src={cities.img} alt={cities.id} />
                <h3 className="cityName">{cities.id}</h3>
              </div>
            </li>
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
