import React from "react";

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
          <a href="#" className="primary-btn" style={{ borderRadius: "5px" }}>
            MUA NGAY
          </a>
        </div>
      </div>
    </>
  );
};

export default Banner;
