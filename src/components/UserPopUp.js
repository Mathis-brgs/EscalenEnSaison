import React, { useEffect, useRef } from "react";
import { useAuth } from "../contexts/authContext/index";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const UserPopUp = ({ onClose }) => {
  const { currentUser } = useAuth();
  const popupRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (error) {
      console.error("Erreur de déconnexion: ", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="user-popup">
      <div className="user-popup-content" ref={popupRef}>
        <h1>Bienvenue, {currentUser.displayName || "Utilisateur"}</h1>
        <img
          src={currentUser.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          className="user-avatar"
        />
        <p>Email: {currentUser.email}</p>
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>
    </div>
  );
};

export default UserPopUp;
