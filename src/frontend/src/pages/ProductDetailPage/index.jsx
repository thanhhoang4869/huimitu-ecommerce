import ItemHorizonList from "components/ItemHorizonList";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const ProductDetailPage = () => {
  return (
    <div>
      <div className="breadcrumb-area">
        <div className="container">
          <div className="d-flex align-items-center">
            <ul className="breadcrumb-list">
              <li className="breadcrumb-item">
                <a href="/">
                  <i className="fa fa-home"></i>
                </a>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Dụng cụ làm bánh</Link>
              </li>
              <li className="breadcrumb-item">Túi và đầu chiết</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="product-details-area section-25">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 col-xs-12 mb-lm-30px mb-md-30px mb-sm-30px">
              <div className="swiper-container zoom-top">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img
                      className="img-responsive m-auto"
                      src="https://5.imimg.com/data5/MS/HP/ON/SELLER-40186332/garden-planters-500x500.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 col-sm-12 col-xs-12"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="product-details-content quickview-content p-3">
                <h2>Tên sản phẩm</h2>

                <div className="product-infor">
                  <ul>
                    <li>
                      Đã bán: <p>33</p>
                    </li>
                    <li>Tùy chọn</li>
                  </ul>
                </div>

                <div className="pricing-meta mt-4">
                  <ul>
                    <li>
                      <strong>100.000</strong>
                    </li>
                  </ul>
                </div>
                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <div className="dec qtybutton">-</div>
                    <input
                      id="quantity"
                      className="cart-plus-minus-box"
                      min="1"
                      defaultValue="1"
                      name="quantity"
                    />
                    <div className="inc qtybutton">+</div>
                  </div>
                  <div className="d-flex mt-4">
                    <span className="pro-details-cart">
                      <form
                        id="formAddCart"
                        method="post"
                        action="/account/cart-add"
                      >
                        <input type="hidden" className="stock" name="Stock" />
                        <button className="add-cart" type="submit">
                          <span>Thêm vào giỏ hàng</span>{" "}
                        </button>
                      </form>
                    </span>

                    <span className="pro-details-cart">
                      <form
                        method="get"
                        id="formBuyNow"
                        action="/product/buynow?ProID={{product.ProID}}&Stock=1"
                      >
                        <input type="hidden" className="stock" name="Stock" />
                        <button className="buy-cart" type="submit">
                          <span>Mua ngay</span>
                        </button>
                      </form>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container section-50 mt-5 mb-5">
          <div className="product-description mb-3">
            <div className="product-description-title">
              <p>Mô tả</p>
            </div>
          </div>
          <div className="product-description-text">
            <div>Mô tả sản phẩm</div>
          </div>
        </div>

        {/* {{!-- Related Product --}} */}
        <div className="container">
          <div className="product-description mb-3">
            <div className="product-description-title">
              <p>Sản phẩm liên quan</p>
            </div>
          </div>

          <ItemHorizonList />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
