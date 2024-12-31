import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

const ActivityCarousel = () => {
  const carouselRef = useRef(null);

  // Fonction pour faire défiler vers la gauche
  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -200, // Ajustez selon la largeur des éléments
      behavior: "smooth",
    });
  };

  // Fonction pour faire défiler vers la droite
  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 200, // Ajustez selon la largeur des éléments
      behavior: "smooth",
    });
  };

  // Liste des activités
  const activities = [
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

  return (
    <div className="activity-carousel">
      {/* Bouton flèche gauche */}
      <button className="carousel-arrow left-arrow" onClick={scrollLeft}>
        &#8249;
      </button>

      {/* Conteneur des activités */}
      <div className="carousel-container" ref={carouselRef}>
        {activities.map((activity) => (
          <NavLink to={`/search/all/${activity.label}`}>
            <div className="activity-item" key={activity.id}>
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-label">{activity.label}</div>
            </div>
          </NavLink>
        ))}
      </div>

      {/* Bouton flèche droite */}
      <button className="carousel-arrow right-arrow" onClick={scrollRight}>
        &#8250;
      </button>
    </div>
  );
};

export default ActivityCarousel;
