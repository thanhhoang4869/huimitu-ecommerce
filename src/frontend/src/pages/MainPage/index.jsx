import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "components/Header";
import LandingPage from "pages/LandingPage";
import CommercePage from "pages/CommercePage";
import Footer from "components/Footer";
import LoginPage from "pages/LoginPage";
import SignupPage from "pages/SignUpPage";

import VerificationPage from "pages/VerificationPage";
import ProductDetailPage from "pages/ProductDetailPage";
import category from "services/category";
import NotFoundPage from "pages/NotFoundPage";
import ServerErrorPage from "pages/ServerErrorPage";
import AccountPage from "pages/AccountPage";
import { AuthContext } from "context/AuthContext/AuthContext";
import GuardRoute from "components/GuardRoute";
import CheckoutPage from "pages/CheckoutPage";

const MainPage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const { isLogin } = useContext(AuthContext);

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
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={<LandingPage categoryList={categoryList} />}
          />
          <Route
            path="/product/*"
            element={<CommercePage categoryList={categoryList} />}
          />
          <Route
            exact
            path="/account/*"
            element={
              <GuardRoute auth={isLogin} redirectTo="/login">
                <AccountPage />
              </GuardRoute>
            }
          />
          <Route
            path="/checkout/*"
            element={
              // <GuardRoute auth={isLogin} redirectTo="/login">
              <CheckoutPage />
              // </GuardRoute>
            }
          />
          <Route exact path="/verify/:token" element={<VerificationPage />} />
          <Route
            exact
            path="/login"
            element={
              <GuardRoute auth={!isLogin} redirectTo="/account/userInformation">
                <LoginPage />
              </GuardRoute>
            }
          ></Route>
          <Route
            exact
            path="/signup"
            element={
              <GuardRoute auth={!isLogin} redirectTo="/account/userInformation">
                <SignupPage />
              </GuardRoute>
            }
          />
          <Route
            exact
            path="/product/detail/:id"
            element={<ProductDetailPage />}
          />
          <Route exact path="/error" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default MainPage;
