import React, { createContext, useContext, useState } from "react";

// Créez un contexte pour les activités
const ActivitiesContext = createContext();

// Fournisseur de contexte
export const ActivitiesProvider = ({ children }) => {
  const activities = [
    { id: 0, icon: "", label: "Toutes" }, // Option par défaut
    { id: 1, icon: "🏨", label: "Hôtels" },
    { id: 2, icon: "🍴", label: "Restaurants" },
    { id: 3, icon: "🛒", label: "Magasins" },
    { id: 4, icon: "🏛️", label: "Monuments" },
    { id: 5, icon: "🥾", label: "Randonnées" },
    { id: 6, icon: "🍲", label: "Spécialités" },
    { id: 7, icon: "⛷️", label: "Activités d'Hiver" },
    { id: 8, icon: "🎭", label: "Culture" },
    { id: 9, icon: "🏖️", label: "Plages" },
    { id: 10, icon: "🌲", label: "Parcs" },
  ];

  const [selectedActivity, setSelectedActivity] = useState(activities[0]); // "Toutes" par défaut

  // Fonction pour réinitialiser à "Toutes"
  const resetActivity = () => {
    setSelectedActivity(activities[0]);
  };

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        activitiesExcludingAll: activities.filter((a) => a.id !== 0), // Exclure "Toutes" pour affichage carrousels
        selectedActivity,
        setSelectedActivity,
        resetActivity,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};

export const useActivities = () => useContext(ActivitiesContext);
