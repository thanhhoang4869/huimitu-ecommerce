import React from "react";
import { Link } from "react-router-dom";

import StarRatings from "react-star-ratings";

const ProductItem = ({ product }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
      <div className="featured__item">
        <div
          className="featured__item__pic set-bg"
          style={{ backgroundImage: `url(${product.img})` }}
        >
          <ul className="featured__item__pic__hover">
            <li>
              <Link to="/product/detail">
                <i className="fa fa-info"></i>
              </Link>
            </li>
            <li>
              <Link to="javascript:;">
                <i className="fa fa-shopping-cart"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="featured__item__text">
          <h5>
            <Link to="/product/detail">{product.name}</Link>
          </h5>
          <StarRatings
            rating={4.5}
            starRatedColor="orange"
            starDimension="30px"
            // changeRating={this.changeRating}
            numberOfStars={5}
            name="rating"
          />
          <div className="mt-2">
            <span>100.000</span> <span>-</span> <span>120.000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
