import React, { createContext, useContext, useState } from "react";

const SeasonContext = createContext();

export const SeasonProvider = ({ children }) => {
  const [selectedSeason, setSelectedSeason] = useState("Toutes");

  return (
    <SeasonContext.Provider value={{ selectedSeason, setSelectedSeason }}>
      {children}
    </SeasonContext.Provider>
  );
};

export const useSeason = () => useContext(SeasonContext);
