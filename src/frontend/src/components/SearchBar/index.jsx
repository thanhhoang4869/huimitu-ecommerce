import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.length > 0) {
      navigate({
        pathname: `/product`,
        search: `searchQuery=${search}&page=1`,
      });
      setSearch("");
    } else {
      swal.fire({
        title: "Info",
        text: t("searchBar.enterKeyword"),
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div className="hero__search">
        <div className="hero__search__form" style={{ borderRadius: "5px" }}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={t("searchBar.enterKeyword")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="site-btn bg-key"
              style={{
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              {t("searchBar.search")}
            </button>
          </form>
        </div>

        <div className="hero__search__phone">
          <div className="hero__search__phone__icon">
            <i className="fa fa-phone"></i>
          </div>
          <div className="hero__search__phone__text">
            <h6>0933443839</h6>
            <span>{t("searchBar.service")}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
