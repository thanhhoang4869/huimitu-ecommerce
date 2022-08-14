import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import logo from "images/logo.png";
import { useContext } from "react";
import { AccountContext } from "context/AccountContext";

const Header = () => {
  const { logout, isLogin, cart, isAdmin, account } =
    useContext(AccountContext);
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <header className="header border pb-1" style={{ marginBottom: "25px" }}>
        <div className="header__top">
          <div className="container" style={{ paddingTop: "25px" }}>
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
                    <Link to="/account/userInformation">
                      <i className="fa fa-user"></i>
                      <span className="ml-2">{account.fullname}</span>
                    </Link>
                  </div>
                  <div className="header__top__right__auth">
                    {isLogin ? (
                      <Link to="/login" onClick={logout}>
                        <i className="fa fa-sign-out mr-2"></i>
                        Đăng xuất
                      </Link>
                    ) : (
                      <Link to="/login">
                        <i className="fa fa-sign-in mr-2"></i>
                        Đăng nhập
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
                  <li className={pathname === "/" ? "active" : ""}>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li
                    className={pathname.startsWith("/product") ? "active" : ""}
                  >
                    <Link to="/product?page=1">Sản phẩm</Link>
                  </li>
                  <li
                    className={pathname.startsWith("/policy") ? "active" : ""}
                  >
                    <Link to="/policy">Chính sách</Link>
                    <ul className="header__menu__dropdown">
                      <li>
                        <Link to="/policy/shipping">Giao hàng</Link>
                      </li>
                      <li>
                        <Link to="/policy/refund">Đổi trả</Link>
                      </li>
                      <li>
                        <Link to="/policy/coupon">Coupons</Link>
                      </li>
                    </ul>
                  </li>
                  {isAdmin && (
                    <li
                      className={pathname.startsWith("/admin") ? "active" : ""}
                    >
                      <Link to="/admin/statistic">Quản trị</Link>
                    </li>
                  )}
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
                    {isLogin && (
                      <Link to="/account/cart">
                        <i className="fa fa-shopping-bag"></i>{" "}
                        <span>{cart.count}</span>
                      </Link>
                    )}
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
