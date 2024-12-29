import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutJapan from "./pages/AboutJapan";
import Error404 from "./pages/Error404";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Article from "./pages/Article.Js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutJapan" element={<AboutJapan />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/article/*" element={<Article />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
library.add(fab);
