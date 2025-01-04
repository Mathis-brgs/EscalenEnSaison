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

      // Mappe les données des activités
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
            : selectedActivity; // Si selectedActivity est un objet, on prend son label

        // Si ce n'est pas 'Toutes', alors on applique le filtre sur le type d'activité
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
  }, [db, selectedCity, selectedSeason, selectedActivity]); // Ajout des dépendances

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  return (
    <div className="activity-cards">
      <ul>
        {/* Affiche les activités filtrées */}
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
              {/* Texte de l'activité */}
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
          </NavLink>
        ))}
      </ul>
      {/* Bouton "Voir plus d'activités" */}
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
