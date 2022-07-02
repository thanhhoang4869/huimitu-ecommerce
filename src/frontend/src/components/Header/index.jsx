import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "images/logo.png";

const Header = ({ handleLogout }) => {
  return (
    <>
      <header className="header border pb-1" style={{ marginBottom: "25px" }}>
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="header__top__left">
                  <ul>
                    <li>
                      <i className="fa fa-envelope"></i> huimitu@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="header__top__right">
                  <div className="header__top__right__social">
                    <a href="/">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="/">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="/">
                      <i className="fa fa-linkedin"></i>
                    </a>
                    <a href="/">
                      <i className="fa fa-pinterest-p"></i>
                    </a>
                  </div>
                  <div className="header__top__right__auth">
                    {localStorage.getItem("token") && (
                      <Link to="/login" onClick={handleLogout}>
                        <i className="fa fa-user"></i>
                        Logout
                      </Link>
                    )}
                    {!localStorage.getItem("token") && (
                      <Link to="/login">
                        <i className="fa fa-user"></i>
                        Login
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row container" style={{ paddingRight: "0px" }}>
            <div className="col-lg-3" style={{ paddingLeft: "0px" }}>
              <div className="header__logo logo">
                <a href="/">
                  <img src={logo} style={{ width: "50%" }} alt="humitu" />
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="header__menu">
                <ul>
                  <li className="active">
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Products</a>
                  </li>
                  <li>
                    <a href="#">Policy</a>
                    <ul className="header__menu__dropdown">
                      <li>
                        <a href="#">Shipping</a>
                      </li>
                      <li>
                        <a href="#">Refund</a>
                      </li>
                      <li>
                        <a href="#">Coupons</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Profile</a>
                  </li>
                  <li>
                    <a href="#">Admin</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              className="col-lg-3 right-corner-header"
              style={{ paddingRight: "0px" }}
            >
              <div className="header__cart">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-shopping-bag"></i> <span>3</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
