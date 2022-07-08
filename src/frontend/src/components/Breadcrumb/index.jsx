import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
  const { category, childCategory } = props;
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
              <Link to={`/category/${category.id}`}>
                {category.categoryName}
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/category/${childCategory.id}`}>
                {childCategory.categoryName}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
