import React from "react";
import { useState, useEffect } from "react";
import ItemHorizonList from "components/ItemHorizonList";
import product from "services/product";

const LandingBottom = () => {
  // const [bestSeller, setBestSeller] = useState([]);

  // useEffect(() => {
  //   setBestSeller(product.getBestSellers());
  //   console.log("bestSeller", bestSeller);
  // }, []);

  return (
    <>
      <section className="mb-3">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>Giảm giá</h2>
            </div>
          </div>
          <ItemHorizonList />
        </div>
      </section>

      <section className="mb-5">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>Bán chạy</h2>
            </div>
          </div>
          <ItemHorizonList />
        </div>
      </section>
    </>
  );
};

export default LandingBottom;
