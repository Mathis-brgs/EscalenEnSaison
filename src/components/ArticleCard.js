import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { NavLink } from "react-router-dom";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJETID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ArticleCard = () => {
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(3); // Nombre initial d'articles affichés

  // Fonction pour récupérer les articles depuis Firebase
  const getArticles = async () => {
    const articleCol = collection(db, "articles");
    const articleSnapshot = await getDocs(articleCol);
    const articlesData = articleSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArticles(articlesData.reverse()); // Inverser l'ordre des articles pour afficher le plus récent en premier
  };

  useEffect(() => {
    getArticles();
  }, []);

  // Fonction pour afficher tous les articles
  const showAllArticles = () => {
    setVisibleArticles(articles.length);
  };
  return (
    <div className="article-cards">
      <ul>
        {articles.slice(0, visibleArticles).map((article, index) => (
          <NavLink to={`/article/${article.id}`} key={article.id}>
            <li className="card" key={index}>
              <div className="articleImgContainer">
                <img
                  className="articleImg"
                  src={article.img}
                  alt={article.alt}
                />
              </div>
              <div className="articleTxtContainer">
                <h3 className="articleName">{article.titre}</h3>
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
      {visibleArticles < articles.length && ( //bouton pour afficher tous les articles
        <div className="show-more-container">
          <button onClick={showAllArticles} className="main-button">
            Voir plus d'articles
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
