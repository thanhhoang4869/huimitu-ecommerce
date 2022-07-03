import React from "react";

const SearchBar = () => {
  return (
    <>
      <div className="hero__search">
        <div className="hero__search__form" style={{ borderRadius: "5px" }}>
          <form action="#">
            <div className="hero__search__categories">
              Tất cả
              <span className="arrow_carrot-down"></span>
            </div>
            <input type="text" placeholder="Bạn cần tìm gì?" />
            <button
              type="submit"
              className="site-btn bg-key"
              style={{
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              Tìm kiếm
            </button>
          </form>
        </div>

        <div className="hero__search__phone">
          <div className="hero__search__phone__icon">
            <i className="fa fa-phone"></i>
          </div>
          <div className="hero__search__phone__text">
            <h6>0933443839</h6>
            <span>Phục vụ 24/7</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
