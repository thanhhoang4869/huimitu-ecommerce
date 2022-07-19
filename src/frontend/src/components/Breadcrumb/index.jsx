import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
  const { category, childCategory, isBigCategory } = props;

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
              <Link to={`/product?categoryId=${category.id}&page=1`}>
                {category.categoryName}
              </Link>
            </li>
            {/* <li className="breadcrumb-item">
              <Link to={`/category/${childCategory.id}`}>
                {childCategory.categoryName}
              </Link>
            </li> */}
            {isBigCategory === false ? (
              <li className="breadcrumb-item">
                <Link to={`/product?categoryId=${childCategory.id}&page=1`}>
                  {childCategory.categoryName}
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
