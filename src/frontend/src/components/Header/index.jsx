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
                    <Link to="/">
                      <i className="fa fa-facebook"></i>
                    </Link>
                    <Link to="/">
                      <i className="fa fa-twitter"></i>
                    </Link>
                    <Link to="/">
                      <i className="fa fa-linkedin"></i>
                    </Link>
                    <Link to="/">
                      <i className="fa fa-pinterest-p"></i>
                    </Link>
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
                <Link to="/">
                  <img src={logo} style={{ width: "50%" }} alt="humitu" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="header__menu">
                <ul>
                  <li className="active">
                    <Link to="#">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Products</Link>
                  </li>
                  <li>
                    <Link to="#">Policy</Link>
                    <ul className="header__menu__dropdown">
                      <li>
                        <Link to="#">Shipping</Link>
                      </li>
                      <li>
                        <Link to="#">Refund</Link>
                      </li>
                      <li>
                        <Link to="#">Coupons</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">Profile</Link>
                  </li>
                  <li>
                    <Link to="#">Admin</Link>
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
                    <Link to="#">
                      <i className="fa fa-shopping-bag"></i> <span>3</span>
                    </Link>
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
