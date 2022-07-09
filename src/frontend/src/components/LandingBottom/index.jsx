import React from "react";
import { useState, useEffect } from "react";
import ItemHorizonList from "components/ItemHorizonList";
import product from "services/product";

const LandingBottom = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  // useEffect(() => {
  //   setBestSeller(product.getBestSellers());
  //   console.log("bestSeller", bestSeller);
  // }, []);

  return (
    <>
      <section className="mb-5">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>Bán chạy</h2>
            </div>
          </div>
          {bestSeller.length > 0 && <ItemHorizonList />}
        </div>
      </section>

      <section className="mb-3">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>Hàng mới</h2>
            </div>
          </div>
          {newArrivals.length > 0 && <ItemHorizonList />}
        </div>
      </section>
    </>
  );
};

export default LandingBottom;
