import React, { useState, useEffect } from "react";
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
  const [filteredActivities, setFilteredActivities] = useState([]);
  

  useEffect(() => {
    const fetchFavoritesAndActivities = async () => {


      const user = auth.currentUser;
      if (!user) {
        setFilteredActivities([]);
        
        return;
      }

      try {
        // Étape 1 : Récupérer les favoris de l'utilisateur
        const favRef = collection(db, "users", user.uid, "favorites");
        const favSnap = await getDocs(favRef);
        const favData = favSnap.docs.map((doc) => doc.data());

   

        // Utilisation correcte de activityId
        const favoriteIds = favData.map(fav => String(fav.activityId));
        

        // Étape 2 : Récupérer les activités dans chaque ville
        const cities = ["Tokyo", "Osaka", "Kyoto", "Nara", "Kobe"];
        let matchingActivities = [];

        for (const city of cities) {
         

          const activitiesRef = collection(db, "japon", city, "activities");
          const activitiesSnap = await getDocs(activitiesRef);

          const cityActivities = activitiesSnap.docs.map((doc) => ({
            id: String(doc.id), // Convertir en string pour éviter les erreurs
            ...doc.data(),
          }));

          // Étape 3 : Filtrage des activités correspondant aux favoris
          const cityMatchingActivities = cityActivities.filter((activity) =>
            favoriteIds.includes(activity.id)
          );
          matchingActivities = [...matchingActivities, ...cityMatchingActivities];
        }

        setFilteredActivities(matchingActivities);
      } catch (error) {
        console.error("Erreur lors de la récupération des activités :", error);
      } 
    };

    fetchFavoritesAndActivities();
  }, []);

  

  return (
    <div className="fav_page">
      <Navigation />
      <div className="fav_container">
        <h2>Mes favoris</h2>
        {filteredActivities.length === 0 ? (
          <p>Aucune activité favorite trouvée.</p>
        ) : (
          <ul>
            {filteredActivities.map((activity, index) => (
              <li key={index}>
                <a
            href={activity.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className="card">
              <div className="season-badges">
                {activity.hiver && <span className="badge badge-winter"></span>}
                {activity.printemps && (
                  <span className="badge badge-spring"></span>
                )}
                {activity.été && <span className="badge badge-summer"></span>}
                {activity.automne && (
                  <span className="badge badge-autumn"></span>
                )}
              </div>

              <div className="activityImgContainer">
                {activity.img ? (
                  <img
                    className="activityImg"
                    src={activity.img}
                    alt={activity.name || "Image de l'activité"}
                  />
                ) : (
                  <div className="placeholderImg">Image indisponible</div>
                )}
              </div>

              <div className="activityTxtContainer">
                <h3 className="activityName">{activity.name}</h3>
                <p className="activityType">
                  {activity.type || "Type inconnu"}
                </p>
                <p className="activityCity">
                  {activity.city || "Ville inconnue"}
                </p>
              </div>
            </li>
          </a>
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
