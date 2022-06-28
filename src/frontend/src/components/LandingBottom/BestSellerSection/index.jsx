import React from "react";
import BestSellerList from "./BestSellerList";

const BestSellerSection = () => {
  return (
    <>
      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>Best sellers</h2>
            </div>
          </div>
          <BestSellerList />
        </div>
      </section>
    </>
  );
};

export default BestSellerSection;
