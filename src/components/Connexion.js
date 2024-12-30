import React from "react";

const Connexion = ({ onClose }) => {
  return (
    <div className="connexion-overlay">
      <div className="connexion-popup">
        <button className="connexion-close" onClick={onClose}>
          ✖
        </button>
        <h2 className="connexion-title">Escale en Saison</h2>
        <h3 className="connexion-subtitle">Connectez-vous</h3>
        <form className="connexion-form">
          <input
            type="email"
            placeholder="Adresse email"
            className="connexion-input"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="connexion-input"
          />
          <button type="submit" className="connexion-submit">
            Connexion
          </button>
        </form>
        <p className="connexion-footer">
          Vous n’avez pas encore de compte ?{" "}
          <a href="/register" className="connexion-link">
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Connexion;
