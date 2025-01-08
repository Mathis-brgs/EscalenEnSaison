import React from "react";
import { useAuth } from "../contexts/authContext/index";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Assurez-vous que vous avez correctement importé `auth` de Firebase.

const UserPopUp = ({ onClose }) => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Déconnexion via Firebase Auth
      onClose(); // Fermer le popup après la déconnexion
    } catch (error) {
      console.error("Erreur de déconnexion: ", error);
    }
  };

  return (
    <div className="user-popup">
      <div className="user-popup-content">
        <h1>Bienvenue, {currentUser.displayName || "Utilisateur"}</h1>
        <img
          src={currentUser.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          className="user-avatar"
        />
        <p>Email: {currentUser.email}</p>
        <button onClick={handleLogout}>Se déconnecter</button>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default UserPopUp;
