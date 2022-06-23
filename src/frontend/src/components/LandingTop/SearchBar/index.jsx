import React from "react";

const SearchBar = () => {
  return (
    <>
      <div class="hero__search">
        <div class="hero__search__form">
          <form action="#">
            <div class="hero__search__categories">
              All Categories
              <span class="arrow_carrot-down"></span>
            </div>
            <input type="text" placeholder="What do yo u need?" />
            <button type="submit" class="site-btn bg-key">
              SEARCH
            </button>
          </form>
        </div>

        <div class="hero__search__phone">
          <div class="hero__search__phone__icon">
            <i class="fa fa-phone"></i>
          </div>
          <div class="hero__search__phone__text">
            <h5>1234567890</h5>
            <span>support 24/7 time</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
