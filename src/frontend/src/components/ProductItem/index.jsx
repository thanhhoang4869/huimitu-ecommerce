import React from "react";
import { Link } from "react-router-dom";

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
              <a href="#">
                <i className="fa fa-shopping-cart"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="featured__item__text">
          <h6>
            <a href="#">{product.name}</a>
          </h6>
          <h5>100VND</h5>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
