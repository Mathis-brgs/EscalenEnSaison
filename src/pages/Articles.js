import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Footer from "../components/Footer-main";
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

const Articles = () => {
  const { idArticle } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const articlesDoc = doc(db, "articles", idArticle); // Référence au document
      const articleSnapshot = await getDoc(articlesDoc);

      if (articleSnapshot.exists()) {
        setArticle(articleSnapshot.data());
      }
    };

    if (idArticle) {
      fetchArticle();
    }
  }, [idArticle]);
  console.log("idArticle:", idArticle);

  return (
    <div>
      <Navigation />
      {article && (
        <div className="ArticleContent">
          <img src={article.img} alt={article.alt || "Alt de l'article"} />
          <h1>{article.titre}</h1>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Articles;
