import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { CityProvider } from "./contexts/CityContext";
import { SeasonProvider } from "./contexts/SeasonContext";
import { ActivitiesProvider } from "./contexts/ActivitiesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CityProvider>
      <SeasonProvider>
        <ActivitiesProvider>
          <App />
        </ActivitiesProvider>
      </SeasonProvider>
    </CityProvider>
  </React.StrictMode>
);
