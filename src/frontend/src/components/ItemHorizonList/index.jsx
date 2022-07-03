import React from "react";
import ProductItem from "components/ProductItem";

const ItemHorizonList = () => {
  const products = [
    {
      id: 0,
      name: "Giấy nến làm bánh",
      img: "https://5.imimg.com/data5/MS/HP/ON/SELLER-40186332/garden-planters-500x500.jpg",
    },
    {
      id: 1,
      name: "Giấy nến làm bánh",
      img: "https://5.imimg.com/data5/MS/HP/ON/SELLER-40186332/garden-planters-500x500.jpg",
    },
    {
      id: 2,
      name: "Giấy nến làm bánh",
      img: "https://5.imimg.com/data5/MS/HP/ON/SELLER-40186332/garden-planters-500x500.jpg",
    },
    {
      id: 3,
      name: "Giấy nến làm bánh",
      img: "https://5.imimg.com/data5/MS/HP/ON/SELLER-40186332/garden-planters-500x500.jpg",
    },
  ];

  return (
    <div className="row featured__filter">
      {products.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ItemHorizonList;
