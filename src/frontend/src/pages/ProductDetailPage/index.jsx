import ItemHorizonList from "components/ItemHorizonList";
import React, {useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import account from "services/account";
import {default as ProductService} from "services/product";
import swal from "sweetalert2";
import api from "utils/api";

import "./style.css";

const ProductDetailPage = () => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState("")
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ProductService.getProductById(id)
        if (data.data.product) {
          setProduct(data.data.product)
          console.log(data.data.product)
        } else {
          swal.fire({
            text: "Rất tiếc, mặt hàng này không tồn tại",
            icon: "info",
            confirmButtonText: "OK",
          });
          //go to 404?
        }
      }
      catch (error) {
        
        setError(error.message)
      }
    }
    getData()
    
  }, [])

  const addToCartOnSubmit = async (e) => {
    e.preventDefault()
    console.log("submit add to cart")
    try {
      //TODO: pass the quantity in params
      const response = await account.addProductToCart(product.id, 1);
      const { exitcode, message } = response.data;

      console.log(response.data)

      if (exitcode === 0) {
        //TODO: update the number of item in cart
        
      } else {
        setError(message);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }


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
                        onSubmit={addToCartOnSubmit}
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
