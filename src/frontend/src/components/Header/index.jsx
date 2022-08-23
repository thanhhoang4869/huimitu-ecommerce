import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

import "./style.css";
import logo from "images/logo.png";
import { useContext } from "react";
import { AccountContext } from "context/AccountContext";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { logout, isLogin, cart, isAdmin, account } =
    useContext(AccountContext);
  const location = useLocation();
  const { pathname } = location;

  const { t } = useTranslation();

  const handleMenuClick = (e) => {
    localStorage.setItem("language", e.key);
    i18n.changeLanguage(localStorage.getItem("language"));
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const langItems = [getItem(t("lang.vi"), "vi"), getItem(t("lang.en"), "en")];

  const headerItems = [];

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

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
                      <i className="fa fa-envelope"></i> huimitu01@gmail.com
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
                  <div className="header__top__right__social">
                    <Dropdown
                      overlay={
                        <Menu
                          mode=""
                          onClick={handleMenuClick}
                          items={langItems}
                        />
                      }
                    >
                      <Link to="" className="header__top__right_lang">
                        <span>
                          {localStorage.getItem("language") === "vi"
                            ? "Tiếng Việt"
                            : "English"}{" "}
                        </span>
                        <i class="fa fa-solid fa-caret-down"></i>
                      </Link>
                    </Dropdown>
                  </div>
                  <div className="header__top__right__auth">
                    {isLogin ? (
                      <Link to="/login" onClick={logout}>
                        <i className="fa fa-sign-out mr-2"></i>
                        {t("loginPage.logout")}
                      </Link>
                    ) : (
                      <Link to="/login">
                        <i className="fa fa-sign-in mr-2"></i>
                        {t("loginPage.login")}
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
                  <img src={logo} style={{ width: "100%" }} alt="humitu" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="header__menu">
                <ul>
                  <li className={pathname === "/" ? "active" : ""}>
                    <Link to="/">{t("navigation.home")}</Link>
                  </li>
                  <li
                    className={pathname.startsWith("/product") ? "active" : ""}
                  >
                    <Link to="/product?page=1">{t("navigation.product")}</Link>
                  </li>
                  <li
                    className={pathname.startsWith("/policy") ? "active" : ""}
                  >
                    <Link to="/policy/shipping">{t("navigation.policy")}</Link>
                    <ul className="header__menu__dropdown">
                      <li>
                        <Link to="/policy/shipping">
                          {t("navigation.shipping")}
                        </Link>
                      </li>
                      <li>
                        <Link to="/policy/refund">
                          {t("navigation.refund")}
                        </Link>
                      </li>
                      <li>
                        <Link to="/policy/coupons">
                          {t("navigation.coupons")}
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {isAdmin && (
                    <li
                      className={pathname.startsWith("/admin") ? "active" : ""}
                    >
                      <Link to="/admin/statistic">{t("navigation.admin")}</Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
            {isLogin && (
              <div
                className="col-lg-3 right-corner-header"
                style={{ paddingRight: "0px" }}
              >
                <div className="header__cart">
                  <ul>
                    <li>
                      <Link to="/account/cart">
                        <i className="fa fa-shopping-bag"></i>{" "}
                        <span>{cart.count}</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
