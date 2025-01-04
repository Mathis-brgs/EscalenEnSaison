import React, { useState } from "react";
import { useActivities } from "../contexts/ActivitiesContext";

const ActivityFilter = ({ onSelect }) => {
  const { activities } = useActivities(); // Accède directement à la liste des activités
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleSelect = (activityLabel) => {
    const newSelection =
      activityLabel === selectedActivity ? null : activityLabel;
    setSelectedActivity(newSelection);
    onSelect(newSelection);
  };

  return (
    <div className="activity-filter">
      {activities.map((activity) => (
        <button
          key={activity.id}
          className={`activity-button ${
            selectedActivity === activity.label ? "selected" : ""
          }`}
          onClick={() => handleSelect(activity.label)}
        >
          {activity.label}
        </button>
      ))}
    </div>
  );
};

export default ActivityFilter;
