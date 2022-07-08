import Breadcrumb from "components/Breadcrumb";
import ItemHorizonList from "components/ItemHorizonList";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { default as ProductService } from "services/product";

import "./style.css";

const ProductDetailPage = () => {
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const [childCategory, setChildCategory] = useState({});
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await ProductService.getProductById(id);
      if (response.data.product) {
        setProduct(response.data.product);
        setCategory(response.data.product.category);
        setChildCategory(response.data.product.category.children);
      } else {
        navigate("/");
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
      <Breadcrumb category={category} childCategory={childCategory} />
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
