import ItemHorizonList from "components/ItemHorizonList";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { default as ProductService } from "services/product";
import swal from "sweetalert2";

import "./style.css";

const ProductDetailPage = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ProductService.getProductById(id);
        if (data.data.product) {
          setProduct(data.data.product);
          console.log(data.data.product);
        } else {
          swal.fire({
            text: "Rất tiếc, mặt hàng này không tồn tại",
            icon: "info",
            confirmButtonText: "OK",
          });
          //go to 404?
        }
      } catch (error) {
        setError(error.message);
      }
    };
    getData();
  }, []);

  const updateQuantity = (delta) => {
    if (quantity + delta > 0) {
      setQuantity(quantity + delta);
      return;
    } else if (delta >= 1) {
      setQuantity(delta);
    }
  };

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
                <Link to="/">{product.categoryName}</Link>
              </li>
              <li className="breadcrumb-item">{product.productName}</li>
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
                <h2>{product.productName}</h2>

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
                      <strong>{product.minPrice}</strong>
                    </li>
                  </ul>
                </div>
                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <div
                      className="dec qtybutton"
                      onClick={() => {
                        updateQuantity(-1);
                      }}
                    >
                      -
                    </div>
                    <input
                      id="quantity"
                      className="cart-plus-minus-box"
                      min="1"
                      value={quantity}
                      name="quantity"
                      number="true"
                      onChange={(e) => {
                        if (
                          e.target.value < 1 ||
                          Number.isNaN(e.target.value)
                        ) {
                          setQuantity(1);
                        } else {
                          setQuantity(e.target.value);
                        }
                      }}
                    />
                    <div
                      className="inc qtybutton"
                      onClick={() => {
                        updateQuantity(1);
                      }}
                    >
                      +
                    </div>
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
                          <span>Thêm vào giỏ hàng</span>
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
            <div>{product.description}</div>
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
