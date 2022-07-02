import React from "react";

const Banner = () => {
  return (
    <>
      <div
        className="hero__item set-bg"
        data-setbg="assets/img/hero/banner.jpg"
      >
        <div className="hero__text">
          <span>BAKING ACCESSORIES</span>
          <h2>
            The very <br />
            BEST
          </h2>
          <p>From home baker to professional chef</p>
          <a
            href="#"
            className="primary-btn bg-key"
            style={{ borderRadius: "5px" }}
          >
            SHOP NOW
          </a>
        </div>
      </div>
    </>
  );
};

export default Banner;
