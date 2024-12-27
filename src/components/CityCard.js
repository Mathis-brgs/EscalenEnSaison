import React from "react";
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

const getCity = async (db) => {
  const cityCol = collection(db, "japon");
  const japonSnapshot = await getDocs(cityCol);
  //  Bien pour une seule donnée
  const cities = japonSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return cities;
};
const cities = await getCity(db);

console.table(cities);
const CityCard = () => {
  return (
    <div className="city-cards">
      <ul>
        {cities
          .slice()
          .reverse()
          .map((cities, index) => (
            <li key={index}>
              <div className="cityImg">
                <img src={cities.img} alt={cities.id} />
                <h3 className="cityName">{cities.id}</h3>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CityCard;
