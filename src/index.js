import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { CityProvider } from "./contexts/CityContext";
import { SeasonProvider } from "./contexts/SeasonContext";
import { ActivitiesProvider } from "./contexts/ActivitiesContext";
import { AuthProvider } from "./contexts/authContext/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("Rendu de l’application...");

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CityProvider>
        <SeasonProvider>
          <ActivitiesProvider>
            <App />
          </ActivitiesProvider>
        </SeasonProvider>
      </CityProvider>
    </AuthProvider>
  </React.StrictMode>
);
