import React, { createContext, useContext, useState } from "react";

// Création du contexte
const CityContext = createContext();

// Fournisseur de contexte
export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(null); // Ville sélectionnée, par défaut null

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity doit être utilisé à l'intérieur de CityProvider");
  }
  return context;
};
