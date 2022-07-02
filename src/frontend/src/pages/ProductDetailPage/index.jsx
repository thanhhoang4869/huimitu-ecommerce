import React from "react";
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
                <a href="/">Big Cat</a>
              </li>
              <li className="breadcrumb-item">Category</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="product-details-area section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 col-xs-12 mb-lm-30px mb-md-30px mb-sm-30px">
              <div className="swiper-container zoom-top">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img
                      className="img-responsive m-auto"
                      src="https://res.cloudinary.com/gearant/image/upload/v1650660411/gearant/16_djxiag.jpg"
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
                <h2>Name</h2>

                <div className="product-infor">
                  <ul>
                    <li>
                      Brand: <p>Brand</p>
                    </li>
                    <li>
                      Sold: <p>33</p>
                    </li>
                    <li>
                      Remaining: <p>20</p>
                    </li>
                  </ul>
                </div>

                <div className="pricing-meta mt-4">
                  <ul>
                    <li>
                      <strong>100VND</strong>
                    </li>
                  </ul>
                </div>
                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <div class="dec qtybutton">-</div>
                    <input
                      id="quantity"
                      className="cart-plus-minus-box"
                      min="1"
                      value="1"
                      name="quantity"
                    />
                    <div class="inc qtybutton">+</div>
                  </div>
                  <div className="d-flex mt-4">
                    <span className="pro-details-cart">
                      <form
                        id="formAddCart"
                        method="post"
                        action="/account/cart-add"
                      >
                        <input
                          type="hidden"
                          name="Username"
                          value="{{authUser.Username}}"
                        />
                        <input
                          type="hidden"
                          name="ProID"
                          value="{{product.ProID}}"
                        />
                        <input type="hidden" className="stock" name="Stock" />
                        <button className="add-cart" type="submit">
                          <span>Add To Cart</span>{" "}
                        </button>
                      </form>
                    </span>

                    <span className="pro-details-cart">
                      <form
                        method="get"
                        id="formBuyNow"
                        action="/product/buynow?ProID={{product.ProID}}&Stock=1"
                      >
                        <input
                          type="hidden"
                          name="ProID"
                          value="{{product.ProID}}"
                        />
                        <input type="hidden" className="stock" name="Stock" />
                        <button className="buy-cart" type="submit">
                          <span>Buy now</span>
                        </button>
                      </form>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container section-2">
          <div className="product-description">
            <div className="product-description-title">
              <p>Description</p>
            </div>
          </div>
          <div className="product-description-text">
            <div>Description</div>
          </div>
        </div>

        {/* {{!-- Related Product --}} */}
        <div className="container">
          <div className="product-description">
            <div className="product-description-title">
              <p>Related Product</p>
            </div>
          </div>

          <div className="owl-carousel owl-theme pt-3 product-carousel">
            <div className="item card-item">
              <div className="card">
                <img src="{{LinkURL}}" className="card-img-top" alt="" />
                <div className="card-body">
                  <h5 className="card-title">Name</h5>
                  <div className="card-price">
                    <p className="card-price-num">Price</p>
                  </div>
                  <p className="card-sold">Sold: 33</p>
                </div>
                <div className="card__overlay">
                  <a
                    href="/product/detail/{{this.ProID}}"
                    className="card__overlay-detail"
                  >
                    <i className="fa fa-arrow-circle-right"></i>Detail
                  </a>
                  <form
                    className="addCartForm"
                    method="post"
                    action="/account/cart-add"
                  >
                    <input type="hidden" name="ProID" value="{{this.ProID}}" />
                    <input
                      type="hidden"
                      className="Stock"
                      name="Stock"
                      value="1"
                    />
                    <button type="submit" className="card__overlay-cart">
                      <i className="fa fa-shopping-cart"></i>Add to cart
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
