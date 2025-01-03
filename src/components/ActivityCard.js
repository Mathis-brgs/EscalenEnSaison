import React, { useState, useEffect, useCallback } from "react";
import {
  collection,
  collectionGroup,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { useCity } from "../contexts/CityContext";
import { useSeason } from "../contexts/SeasonContext";

const ActivityCard = () => {
  const { selectedCity } = useCity();
  const { selectedSeason } = useSeason();
  const db = getFirestore();
  const [activities, setActivities] = useState([]);
  const [visibleActivities, setVisibleActivities] = useState(12);

  const getActivities = useCallback(async () => {
    try {
      let querySnapshot;

      if (!selectedCity || selectedCity === "Toutes") {
        querySnapshot = await getDocs(collectionGroup(db, "activities"));
      } else {
        querySnapshot = await getDocs(
          collection(db, `japon/${selectedCity}/activities`)
        );
      }

      let activitiesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Filtrer par saison si une saison spécifique est sélectionnée
      if (selectedSeason && selectedSeason !== "Toutes") {
        activitiesData = activitiesData.filter(
          (activity) => activity[selectedSeason.toLowerCase()] === true
        );
      }

      setActivities(activitiesData.reverse());
    } catch (error) {
      console.error("Erreur lors de la récupération des activités :", error);
    }
  }, [db, selectedCity, selectedSeason]); // Ajout de selectedSeason comme dépendance

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  return (
    <div className="activity-cards">
      <ul>
        {activities.slice(0, visibleActivities).map((activity) => (
          <NavLink to={`/activity/${activity.id}`} key={activity.id}>
            <li className="card">
              {/* Badges des saisons */}
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
              {/* Image de l'activité */}
              <div className="activityImgContainer">
                <img
                  className="activityImg"
                  src={activity.img}
                  alt={activity.name}
                />
              </div>
              {/* Texte de l'activité */}
              <div className="activityTxtContainer">
                <h3 className="activityName">{activity.name}</h3>
                <p className="activityType">{activity.type}</p>
                <p className="activityCity">{activity.city}</p> {/* Corrigé */}
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
      {visibleActivities < activities.length && (
        <div className="show-more-container">
          <button
            onClick={() => setVisibleActivities(activities.length)}
            className="main-button"
          >
            Voir plus d'activités
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
