import React from "react";
import { useActivities } from "../contexts/ActivitiesContext";

const ActivityFilter = () => {
  const { activities, selectedActivity, setSelectedActivity } = useActivities();

  const handleSelect = (activityLabel) => {
    const newSelection =
      activityLabel === selectedActivity?.label ? null : activityLabel;
    const selectedActivityObj =
      newSelection !== null
        ? activities.find((activity) => activity.label === newSelection)
        : null;
    setSelectedActivity(selectedActivityObj);
  };

  if (!Array.isArray(activities) || activities.length === 0) {
    return <div className="activity-filter">Aucune activité disponible</div>;
  }

  return (
    <div className="activity-filter">
      {activities.map((activity) => (
        <button
          key={activity.id}
          className={`activity-button ${
            selectedActivity?.label === activity.label ||
            (selectedActivity === null && activity.label === "Toutes")
              ? "selected"
              : ""
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
