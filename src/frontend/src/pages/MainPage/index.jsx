import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "components/Header";
import LandingPage from "pages/LandingPage";
import CommercePage from "pages/CommercePage";
import Footer from "components/Footer";
import LoginPage from "pages/LoginPage";
import SignupPage from "pages/SignupPage";

import config from "config/config";
import VerificationPage from "pages/VerificationPage";
import ProductDetailPage from "pages/ProductDetailPage";
import category from "services/category";
import NotFoundPage from "pages/NotFoundPage";

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

  const [categoryList, setCategoryList] = useState([]);

  const getCategoryList = async () => {
    const response = await category.getCategoryList();
    const data = response.data.categories;
    localStorage.setItem("categoryList", JSON.stringify(data));
    setCategoryList(data);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className="MainDiv">
      <BrowserRouter>
        <Header handleLogout={logout} />
        <Routes>
          <Route
            exact
            path="/"
            element={<LandingPage categoryList={categoryList} />}
          />
          <Route
            path="/category/*"
            element={<CommercePage categoryList={categoryList} />}
          />
          <Route
            path="/search/*"
            element={<CommercePage categoryList={categoryList} />}
          />
          <Route
            exact
            path="/account/verify/:token"
            element={<VerificationPage />}
          />
          <Route
            exact
            path="/login"
            element={<LoginPage handleLogin={login} />}
          />
          <Route
            exact
            path="/signup"
            element={<SignupPage handleLogin={login} />}
          />
          <Route
            exact
            path="/product/detail/:id"
            element={<ProductDetailPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default MainPage;
