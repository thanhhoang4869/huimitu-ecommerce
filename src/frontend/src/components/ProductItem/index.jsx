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
        <Link to={`/product/detail/${product.id}`}>
          <div
            className="featured__item__pic set-bg"
            style={{
              backgroundImage: `url("${product.image}")`,
            }}
          ></div>
        </Link>
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
