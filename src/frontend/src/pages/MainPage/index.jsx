import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../../components/Header";
import LandingPage from "../LandingPage";
import CommercePage from "../CommercePage";
import Footer from "../../components/Footer";

const MainPage = () => {
  return (
    <div className="MainDiv">
      <Header />

      <BrowserRouter>
        <Routes>
          <Route exact path="/category/*" element={<CommercePage />} />
          <Route exact path="/search/*" element={<CommercePage />} />
          <Route exact path="/*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
};

export default MainPage;