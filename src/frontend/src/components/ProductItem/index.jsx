import React from "react";
import { Link } from "react-router-dom";
import { Popover } from "antd";

import StarRatings from "react-star-ratings";
import formatter from "../../utils/formatter";

const ProductItem = ({ product, isResult }) => {
  const content = (
    <div>
      <p>{product.productName}</p>
    </div>
  );
  return (
    <div
      className={`${
        isResult ? "col-lg-4" : "col-lg-3"
      } col-md-4 col-sm-6 mix oranges fresh-meat`}
    >
      <div className="featured__item">
        <div
          className="featured__item__pic set-bg"
          style={{
            backgroundImage: `url("https://5.imimg.com/data5/MS/HP/ON/SELLER-40186332/garden-planters-500x500.jpg")`,
          }}
        >
          <ul className="featured__item__pic__hover">
            <li>
              <Link to={`/product/detail/${product.id}`}>
                <i className="fa fa-info"></i>
              </Link>
            </li>
            <li>
              <Link to="/account/cart">
                <i className="fa fa-shopping-cart"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="featured__item__text">
          <Popover content={content} placement="bottomLeft">
            <Link to={`/product/detail/${product.id}`}>
              <h5 className="text-truncate">{product.productName}</h5>
            </Link>{" "}
          </Popover>

          <StarRatings
            rating={product.avgRating}
            starRatedColor="orange"
            starDimension="30px"
            // changeRating={this.changeRating}
            numberOfStars={5}
            name="rating"
          />
          <div className="mt-2">
            <span>{formatter.formatPrice(product.minPrice)}</span>{" "}
            <span>-</span>{" "}
            <span>{formatter.formatPrice(product.maxPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
