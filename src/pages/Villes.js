import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Footer from "../components/Footer-main";

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

const Villes = () => {
  const { nomVille } = useParams();
  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      const cityDoc = doc(db, "japon", nomVille); // Référence au document
      const citySnapshot = await getDoc(cityDoc);

      if (citySnapshot.exists()) {
        setCity(citySnapshot.data());
      }
    };

    if (nomVille) {
      fetchCity();
    }
  }, [nomVille]);

  return (
    <div>
      <Navigation />
      {city && (
        <div className="CityContent">
          <img src={city.img} alt={city.nom || "Image de la ville"} />
          <div className="P1">
            <h1>{city.nom}</h1>
            <p className="intro">{city.intro}</p>
            <h2>{city.titreP1}</h2>
            <p>{city.corps1P1}</p>
            <p>{city.corps2P1}</p>
            <p>{city.corpsP1}</p>
          </div>

          <div className="P2">
            <h2>{city.titreP2}</h2>
            <p>{city.corps1P2}</p>
            <p>{city.corps2P2}</p>
            <p>{city.corpsP2}</p>
          </div>

          <div className="P3">
            <h2>{city.titreP3}</h2>
            <p>{city.corps1P3}</p>
            <p>{city.corps2P3}</p>
            <p>{city.corpsP3}</p>
          </div>

          <div className="P4">
            <h2>{city.titreP4}</h2>
            <h3>{city.sousTitre1P4}</h3>
            <p>{city.corps1P4}</p>
            <br />
            <h3>{city.sousTitre2P4}</h3>
            <p>{city.corps2P4}</p>
            <p>{city.corpsP4}</p>
          </div>

          <div className="P5">
            <h2>{city.titreP5}</h2>
            <p>{city.corps1P5}</p>
            <p>{city.corps2P5}</p>
            <p>{city.corpsP5}</p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Villes;
