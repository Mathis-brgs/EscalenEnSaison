import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { doSignInWithGoogle } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";

const Connexion = ({ onClose }) => {
  const { userLoggedIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
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

        <div className="google-connexion">
          <button
            type="submit"
            className="connexion-submit"
            onClick={(e) => onGoogleSignIn(e)}
          >
            Connexion avec Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
