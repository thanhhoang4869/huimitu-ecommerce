import React from "react";

const CategoryBar = () => {
  return (
    <>
      <div className="col-lg-3">
        <div className="hero__categories">
          <div className="hero__categories__all">
            <i className="fa fa-bars"></i>
            <span>Danh mục</span>
          </div>
          <ul>
            <li>
              <a href="#">Khuôn bánh</a>
            </li>
            <li>
              <a href="#">Giấy nến</a>
            </li>
            <li>
              <a href="#">Que trát kem</a>
            </li>
            <li>
              <a href="#">Dao răng cưa</a>
            </li>
            <li>
              <a href="#">Dụng cụ phết trang trí</a>
            </li>
            <li>
              <a href="#">Đầu chiết</a>
            </li>
            <li>
              <a href="#">Dụng cụ bắt kem</a>
            </li>
            <li>
              <a href="#">Tượng trang trí</a>
            </li>
            <li>
              <a href="#">Que cắm trang trí</a>
            </li>
            <li>
              <a href="#">Topper mica</a>
            </li>
            <li>
              <a href="#">Cốm trang trí</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CategoryBar;
