import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <div
        className="hero__item set-bg"
        style={{ backgroundImage: "url(assets/img/hero/banner.jpg)" }}
      >
        <div className="hero__text">
          <span>Làm bánh và Trang trí</span>
          <h2>
            Đa dạng <br />
            Giá tốt
          </h2>
          <p>Đồng hành cùng bạn trong bếp bánh!</p>
          <Link
            to="/product?page=1"
            className="primary-btn"
            style={{ borderRadius: "5px" }}
          >
            MUA NGAY
          </Link>
        </div>
      </div>
    </>
  );
};

export default Banner;
