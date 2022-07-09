import React from "react";
import ProductItem from "components/ProductItem";

const ItemHorizonList = (props) => {
  return (
    <>
      <div className="row">
        {props.products.map((product) => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              isResult={props.isResult}
            />
          );
        })}
      </div>
    </>
  );
};

export default ItemHorizonList;
