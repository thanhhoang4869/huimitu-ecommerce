import React from "react";
import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <>
      {/* <div className="banner pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <img src="/assets/img/banner/banner-1.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <img src="/assets/img/banner/banner-2.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <footer className="footer spad border">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer__about">
                <div className="footer__about__logo">
                  <a href="/" style={{ width: "50%" }}>
                    <img src={logo} alt="logo" />
                  </a>
                </div>
                <ul>
                  <li>Địa chỉ: 227 Nguyen Van Cu, HCMC</li>
                  <li>SĐT: (028) 3 5120 730</li>
                  <li>Email: huitimu@gmail.com</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
              <div className="footer__widget">
                <h6>Tham khảo</h6>
                <ul>
                  <li>
                    <a href="#">Chính sách đổi trả</a>
                  </li>
                  <li>
                    <a href="#">Chính sách giao hàng</a>
                  </li>
                  <li>
                    <a href="#">Coupons</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Theo dõi đơn hàng</a>
                  </li>
                  <li>
                    <a href="#">Bản đồ</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="footer__widget">
                <h6>Liên hệ</h6>
                <div className="footer__widget__social">
                  <a href="/">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="/">
                    <i className="fa fa-instagram"></i>
                  </a>
                  <a href="/">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="/">
                    <i className="fa fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="footer__copyright">
                <div className="footer__copyright__text">
                  <p>Copyright &copy;2022 All rights reserved</p>
                </div>
                <div className="footer__copyright__payment">
                  <img src="/assets/img/payment-item.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
