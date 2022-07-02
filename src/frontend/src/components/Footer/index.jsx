import React from "react";
import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <>
      <div class="banner pb-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="banner__pic">
                <img src="/assets/img/banner/banner-1.jpg" alt="" />
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="banner__pic">
                <img src="/assets/img/banner/banner-2.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="footer spad border">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="footer__about">
                <div class="footer__about__logo">
                  <a href="/" style={{ width: "50%" }}>
                    <img src={logo} alt="logo" />
                  </a>
                </div>
                <ul>
                  <li>Address: 227 Nguyen Van Cu, HCMC</li>
                  <li>Phone: (028) 3 5120 730</li>
                  <li>Email: huitimu@gmail.com</li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
              <div class="footer__widget">
                <h6>Resources</h6>
                <ul>
                  <li>
                    <a href="#">Warranty policy</a>
                  </li>
                  <li>
                    <a href="#">Shipping policy</a>
                  </li>
                  <li>
                    <a href="#">Coupon policy</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Track my order</a>
                  </li>
                  <li>
                    <a href="#">Our site map</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-12">
              <div class="footer__widget">
                <h6>Reach us</h6>
                <div class="footer__widget__social">
                  <a href="/">
                    <i class="fa fa-facebook"></i>
                  </a>
                  <a href="/">
                    <i class="fa fa-instagram"></i>
                  </a>
                  <a href="/">
                    <i class="fa fa-twitter"></i>
                  </a>
                  <a href="/">
                    <i class="fa fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="footer__copyright">
                <div class="footer__copyright__text">
                  <p>Copyright &copy;2022 All rights reserved</p>
                </div>
                <div class="footer__copyright__payment">
                  <img src="assets/img/payment-item.png" alt="" />
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
