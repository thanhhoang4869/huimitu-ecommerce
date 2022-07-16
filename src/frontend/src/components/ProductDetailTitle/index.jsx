import React from "react";

const ProductDetailTitle = ({title}) => {
  return (
    <div className="product-description mb-3">
      <div className="product-description-title">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default ProductDetailTitle;
