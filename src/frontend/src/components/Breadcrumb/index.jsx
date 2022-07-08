import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
  return (
    <div className="breadcrumb-area">
      <div className="container">
        <div className="d-flex align-items-center">
          <ul className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fa fa-home"></i>
              </Link>
            </li>
            <li className="breadcrumb-item">
              {/* <Link to={`/category/${props.category.categoryId}`}> */}
              <Link to="/">{props.product.categoryName}</Link>
            </li>
            <li className="breadcrumb-item">
              {/* <Link to={`/category/${props.child.categoryId}`}> */}
              <Link to="/">{props.child.categoryName}</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
