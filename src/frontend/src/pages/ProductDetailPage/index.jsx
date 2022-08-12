import Breadcrumb from "components/Breadcrumb";
import ItemHorizonList from "components/ItemHorizonList";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { default as productService } from "services/product";

import CustomComment from "components/CustomComment";
import ImageSlider from "components/ImageSlider";
import ProductDetailTitle from "components/ProductDetailTitle";

import "./style.css";
import formatter from "utils/formatter";
import { Button, Radio, Space } from "antd";
import variantService from "services/variant";
import { useContext } from "react";
import { AccountContext } from "context/AccountContext";
import cartService from "services/cart";
import swal from "sweetalert2";
import reviewService from "services/review";

const ProductDetailPage = () => {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState({});
  const [variants, setVariants] = useState([]);
  const [childCategory, setChildCategory] = useState({});
  const [isBigCategory, setIsBigCategory] = useState(false);

  const { productId } = useParams();
  const [selectVariant, setSelectVariant] = useState({});

  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { fetchCart } = useContext(AccountContext);

  const navigator = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await productService.getProductById(productId);
      const { exitcode, product } = response.data;
      if (exitcode === 0) {
        setProduct(product);
        setCategory(product.category);
        setChildCategory(product.category.children);
        setIsBigCategory(!product.category.children);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await reviewService.getReview({
        productId: productId,
      });
      const { exitcode, reviews } = response.data;
      if (exitcode === 0) {
        setReviews(reviews);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await productService.getRelatedProducts(productId);
      const { products, exitcode } = response.data;
      if (exitcode === 0) {
        setRelatedProducts(products);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVariants = async () => {
    try {
      const response = await variantService.getByProductId(productId);
      const { exitcode, variants } = response.data;
      if (exitcode === 0) {
        if (variants.length < 1) {
          swal.fire({
            title: "Xem chi tiết sản phẩm",
            text: "Sản phẩm chưa có các biến thể",
            icon: "info",
            confirmButtonText: "OK",
          });
          navigator("/");
        }
        setSelectVariant(variants[0]);
        setVariants(variants);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    fetchRelatedProducts();
    fetchVariants();
  }, []);

  const handleChangeSelectVariant = (e) => {
    const variantId = e.target.value;
    setSelectVariant(variants.filter((item) => item.id === variantId)[0]);
  };

  const updateQuantity = (delta) => {
    if (quantity + delta > 0) {
      setQuantity(quantity + delta);
      return;
    } else if (delta >= 1) {
      setQuantity(delta);
    }
  };

  const addToCartOnSubmit = async () => {
    try {
      const response = await cartService.addToCart(selectVariant.id, quantity);
      const { exitcode } = response.data;

      // eslint-disable-next-line default-case
      switch (exitcode) {
        case 0: {
          swal.fire({
            text: "Thêm sản phẩm thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
          await fetchCart();
          break;
        }
        case 101: {
          swal.fire({
            text: "Không tìm thấy sản phẩm",
            icon: "error",
            confirmButtonText: "OK",
          });
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Breadcrumb
        category={category}
        isBigCategory={isBigCategory}
        childCategory={childCategory}
      />
      <div className="product-details-area section-25">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 col-xs-12 mb-lm-30px mb-md-30px mb-sm-30px">
              <div className="swiper-container zoom-top">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <ImageSlider className="img-responsive m-auto">
                      {(product.images || []).map((item) => item.path)}
                    </ImageSlider>
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
                      Đã bán: <p>{product.soldQuantity}</p>
                    </li>
                    <li>
                      Còn lại: <p>{selectVariant.stock}</p>
                    </li>
                    <li>Tùy chọn</li>
                    <Radio.Group
                      value={selectVariant.id}
                      onChange={handleChangeSelectVariant}
                    >
                      <Space direction="vertical">
                        {variants.map((item) => (
                          <Radio key={item.id} value={item.id}>
                            {item.variantName}
                          </Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  </ul>
                </div>

                <div className="pricing-meta mt-4">
                  <ul>
                    <h6 className="text-secondary">
                      {selectVariant.discountPrice && (
                        <strike>{`${formatter.formatPrice(
                          selectVariant.price
                        )}₫`}</strike>
                      )}
                    </h6>
                    <li>
                      <strong>
                        {`${formatter.formatPrice(
                          selectVariant.discountPrice || selectVariant.price
                        )}₫`}
                      </strong>
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
                      <Button
                        type="primary"
                        size="large"
                        className="add-cart"
                        onClick={addToCartOnSubmit}
                        disabled={selectVariant.stock < quantity}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </span>

                    <span className="pro-details-cart">
                      <Button
                        size="large"
                        type="primary"
                        className="buy-cart"
                        disabled={selectVariant.stock < quantity}
                        onClick={() =>
                          navigator(
                            `/checkout?variantId=${selectVariant.id}&quantity=${quantity}`
                          )
                        }
                      >
                        <span>Mua ngay</span>
                      </Button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5 mb-5">
          <ProductDetailTitle title="Mô tả" />
          <div className="product-description-text">
            <div
              className="pl-3"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
          </div>
        </div>

        {/* {{!-- Related Product --}} */}
        {relatedProducts.length > 0 && (
          <div className="container">
            <ProductDetailTitle title="Sản phẩm liên quan" />
            <ItemHorizonList products={relatedProducts} />
          </div>
        )}

        <div className="container section-50 mt-5 mb-5">
          <ProductDetailTitle title="Đánh giá" />

          {reviews.map((review, index) => (
            <CustomComment key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
