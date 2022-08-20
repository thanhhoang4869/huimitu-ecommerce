import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);
  return (
    <>
      <div
        className="hero__item set-bg"
        style={{ backgroundImage: "url(assets/img/hero/banner.jpg)" }}
      >
        <div className="hero__text">
          <span>{t("banner.header")}</span>
          <h2>
            {t("banner.various")} <br />
            {t("banner.affordable")}
          </h2>
          <p>{t("banner.slogan")}</p>
          <Link
            to="/product?page=1"
            className="primary-btn"
            style={{ borderRadius: "5px" }}
          >
            {t("banner.buyNow")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Banner;
