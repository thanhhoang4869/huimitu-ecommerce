import React from "react";

const ProductDetailTilte = ({title}) => {
  return (
    <div className="product-description mb-3">
      <div className="product-description-title">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default ProductDetailTilte;
