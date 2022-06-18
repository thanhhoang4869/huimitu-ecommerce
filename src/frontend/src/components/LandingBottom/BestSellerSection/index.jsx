import React from "react";
import BestSellerList from "./BestSellerList";

const BestSellerSection = () => {
  return (
    <>
      <section class="featured spad">
        <div class="container">
          <div class="row">
            <div class="section-title">
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
