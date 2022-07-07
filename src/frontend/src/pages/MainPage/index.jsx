import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "components/Header";
import LandingPage from "pages/LandingPage";
import CommercePage from "pages/CommercePage";
import Footer from "components/Footer";
import LogInPage from "pages/LogInPage";
import SignupPage from "pages/SignupPage";
import config from "config/config";
import VerificationPage from "pages/VerificationPage";
import ProductDetailPage from "pages/ProductDetailPage";

const MainPage = () => {
  const [token, setToken] = useState(
    localStorage.getItem(config.storageKeys.ACCESS_KEY)
  );

  const login = (token) => {
    localStorage.setItem(config.storageKeys.ACCESS_KEY, token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem(config.storageKeys.ACCESS_KEY);
    setToken(null);
  };

  return (
    <div className="MainDiv">
      <BrowserRouter>
        <Header handleLogout={logout} />
        <Routes>
          <Route exact path="/category/*" element={<CommercePage />} />
          <Route exact path="/search/*" element={<CommercePage />} />
          <Route exact path="/*" element={<LandingPage />} />
          <Route
            exact
            path="/account/verify/:token"
            element={<VerificationPage />}
          />
          <Route
            exact
            path="/login"
            element={<LogInPage handleLogin={login} />}
          />
          <Route
            exact
            path="/signup"
            element={<SignupPage handleLogin={login} />}
          />
          <Route exact path="/product/detail" element={<ProductDetailPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default MainPage;
