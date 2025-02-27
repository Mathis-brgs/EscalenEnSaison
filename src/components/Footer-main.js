import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    //Navlink à rajouter
    <div className="footer-main">
      <ul className="footer-links">
        
          <NavLink to="/aboutJapan"><li>Japon</li></NavLink>
        
        
          <NavLink to="/search"><li>Activités</li></NavLink>
          
        
          <NavLink to="/"><li>Conseils Voyageurs</li></NavLink>
       
        
          <NavLink to="/TauxDeChange"><li>Taux de changes</li></NavLink>
        
      </ul>

      <div className="separation-white"></div>
      <h5 className="footer-slogan">Organisation de voyage personnalisé</h5>
      <h5 className="copyright">©Escale en Saison</h5>
    </div>
  );
};

export default Footer;
