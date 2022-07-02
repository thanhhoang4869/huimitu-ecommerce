import React from "react";
import BestSellerItem from "../BestSellerItem";

const BestSellerList = () => {
  //Some fake data to test
  var products = [
    {
      id: 0,
      name: "Cupcake mould",
      img: "./assets/img/featured/cupcake-mould.jpeg",
      price: 4.99,
    },
    {
      id: 1,
      name: "Round mould",
      img: "./assets/img/featured/round-mould.jpeg",
      price: 5.1,
    },
    {
      id: 2,
      name: "Heart mould",
      img: "./assets/img/featured/heart-mould.jpeg",
      price: 8.25,
    },
  ];
  return (
    <div className="row featured__filter">
      {products.map((product) => {
        return <BestSellerItem key={product.id} product={product} />;
      })}
    </div>
  );
};

export default BestSellerList;
