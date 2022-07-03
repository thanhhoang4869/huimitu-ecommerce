import React from "react";

const SearchBar = () => {
  return (
    <>
      <div className="hero__search">
        <div className="hero__search__form" style={{ borderRadius: "5px" }}>
          <form action="#">
            <div className="hero__search__categories">
              All Categories
              <span className="arrow_carrot-down"></span>
            </div>
            <input type="text" placeholder="What do you need?" />
            <button
              type="submit"
              className="site-btn bg-key"
              style={{
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              SEARCH
            </button>
          </form>
        </div>

        <div className="hero__search__phone">
          <div className="hero__search__phone__icon">
            <i className="fa fa-phone"></i>
          </div>
          <div className="hero__search__phone__text">
            <h5>1234567890</h5>
            <span>support 24/7 time</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
