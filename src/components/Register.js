import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext";

const Connexion = ({ onClose }) => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
    }
  };

  return (
    <div className="connexion-overlay">
      {userLoggedIn && <NavLink to={"/"} replace={true} />}
      <div className="connexion-popup">
        <button className="connexion-close" onClick={onClose}>
          ✖
        </button>
        <h2 className="connexion-title">Escale en Saison</h2>
        <h3 className="connexion-subtitle">Connectez-vous</h3>
        <form className="connexion-form" onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Adresse email"
            required
            className="connexion-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="connexion-input"
          />
          {errorMessage && (
            <span className="text-red-600 font-bold">{errorMessage}</span>
          )}
          <button
            type="submit"
            disabled={isSigningIn}
            className="connexion-submit"
          >
            {isSigningIn ? "Connexion ..." : "Connexion"}
          </button>
        </form>

        <button
          type="submit"
          className="connexion-submit"
          onClick={(e) => {
            onGoogleSignIn(e);
          }}
        >
          Connexion avec Google
        </button>
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
