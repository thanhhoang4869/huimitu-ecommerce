import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemHorizonList from "components/ItemHorizonList";
import productService from "services/product";

const LandingBottom = () => {
  const [newArrivals, setNewArrivals] = useState(JSON.stringify([]));
  const [bestSellers, setBestSellers] = useState(JSON.stringify([]));

  const navigate = useNavigate();

  useEffect(() => {
    // getBestSellers();
    getNewArrivals();
  });

  console.log(newArrivals);

  const getNewArrivals = async () => {
    try {
      const response = await productService.getNewArrivals();
      setNewArrivals(JSON.stringify(response.data.products));
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/error");
      } else {
        navigate("/404");
      }
    }
  };

  return (
    <>
      <section className="mb-5">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>Bán chạy</h2>
            </div>
          </div>
          {/* {bestSeller.length > 0 && <ItemHorizonList />} */}
        </div>
      </section>

      <section className="mb-3">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>Hàng mới</h2>
            </div>
          </div>
          {JSON.parse(newArrivals).length > 0 && (
            <ItemHorizonList products={JSON.parse(newArrivals)} />
          )}
        </div>
      </section>
    </>
  );
};

export default LandingBottom;
