import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useActivities } from "../contexts/ActivitiesContext";

const ActivityCarousel = () => {
  const carouselRef = useRef(null);
  const { activitiesExcludingAll, setSelectedActivity } = useActivities();

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="activity-carousel">
      <button className="carousel-arrow left-arrow" onClick={scrollLeft}>
        &#8249;
      </button>
      <div className="carousel-container" ref={carouselRef}>
        {activitiesExcludingAll.map((activity) => (
          <NavLink
            to={`/search`}
            key={activity.id}
            onClick={() => {
              console.log("Setting selected activity:", activity); // Debug
              setSelectedActivity(activity); // Met à jour l'activité sélectionnée
            }}
          >
            <div className="activity-item">
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-label">{activity.label}</div>
            </div>
          </NavLink>
        ))}
      </div>
      <button className="carousel-arrow right-arrow" onClick={scrollRight}>
        &#8250;
      </button>
    </div>
  );
};

export default ActivityCarousel;
