import React from "react";

const Footer = () => {
  return (
    //Navlink à rajouter
    <div className="footer-main">
      <ul className="footer-links">
        <li>Japon</li>
        <li>Activités</li>
        <li>Conseils Voyageurs</li>
        <li>Taux de changes</li>
        <li>Compartif de vols</li>
      </ul>

      <div className="separation-white"></div>
      <h5 className="footer-slogan">Organisation de voyage personnalisé</h5>
      <h5 className="copyright">©Escale en Saison</h5>
    </div>
  );
};

export default Footer;
