import React, { useState, useEffect, useCallback } from "react";
import {
  collection,
  collectionGroup,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import { useCity } from "../contexts/CityContext";
import { useSeason } from "../contexts/SeasonContext";
import { useActivities } from "../contexts/ActivitiesContext";

const ActivityCard = () => {
  const [activities, setActivities] = useState([]);
  const [visibleActivities, setVisibleActivities] = useState(5); // Nombre d'activités à afficher
  const { selectedCity } = useCity();
  const { selectedSeason } = useSeason();
  const { selectedActivity } = useActivities();

  const db = getFirestore(); // Initialisation de la référence Firestore

  const getActivities = useCallback(async () => {
    try {
      let querySnapshot;

      // Filtre par ville
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

      // Filtre par saison
      if (selectedSeason && selectedSeason !== "Toutes") {
        activitiesData = activitiesData.filter(
          (activity) => activity[selectedSeason.toLowerCase()] === true
        );
      }

      // Filtre par type d'activité
      if (selectedActivity) {
        const selectedActivityLabel =
          selectedActivity && selectedActivity.label
            ? selectedActivity.label
            : selectedActivity;

        if (selectedActivityLabel !== "Toutes") {
          activitiesData = activitiesData.filter(
            (activity) =>
              activity.type &&
              activity.type.toLowerCase() ===
                selectedActivityLabel.toLowerCase()
          );
        }
      }

      setActivities(activitiesData.reverse());
    } catch (error) {
      console.error("Erreur lors de la récupération des activités :", error);
    }
  }, [db, selectedCity, selectedSeason, selectedActivity]);

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  return (
    <div className="activity-cards">
      <ul>
        {activities.slice(0, visibleActivities).map((activity) => (
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
