import React, { useState, useEffect } from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer-main";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { auth } from "../firebase/firebase";

// Config Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJETID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Fav = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      const favRef = collection(db, "users", user.uid, "favorites");
      try {
        const favSnap = await getDocs(favRef);
        const favData = favSnap.docs.map((doc) => doc.data());
        setFavorites(favData); 
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites(); 
  }, []); 

  if (loading) {
    return <div>Chargement des favoris...</div>;
  }

  return (
    <div className='fav_page'>
      <Navigation />
      <div className='fav_container'>
      <h2>Mes favoris</h2>
      {favorites.length === 0 ? (
        <p>Aucun favori ajouté.</p>
      ) : (
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index}>
              
              <span>{favorite.name}</span>
            </li>
          ))}
        </ul>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default Fav;
