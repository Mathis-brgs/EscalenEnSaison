import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpucsBgcuLam24cCJoXnfbPBjvmnHCKTA",
  authDomain: "escaleensaison.firebaseapp.com",
  projectId: "escaleensaison",
  storageBucket: "escaleensaison.firebasestorage.app",
  messagingSenderId: "1034229447699",
  appId: "1:1034229447699:web:9a76c97da164e6a32253e6",
  measurementId: "G-JT9VN0BKLK",
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
    setArticles(articlesData.reverse()); // Inverser l'ordre des articles
  };

  useEffect(() => {
    getArticles();
  }, []);

  // Fonction pour afficher tous les articles
  const showAllArticles = () => {
    setVisibleArticles(articles.length); // Afficher tous les articles
  };

  return (
    <div className="article-cards">
      <ul>
        {articles.slice(0, visibleArticles).map(
          (
            article,
            index //afficher en listes les cards des articles
          ) => (
            <li className="card" key={index}>
              <div className="articleImgContainer">
                <img
                  className="articleImg"
                  src={article.img}
                  alt={article.alt}
                />
              </div>
              <div className="articleTxtContainer">
                <h3 className="articleName">{article.id}</h3>
              </div>
            </li>
          )
        )}
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
