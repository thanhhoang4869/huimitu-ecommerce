import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemHorizonList from "components/ItemHorizonList";
import productService from "services/product";

const LandingBottom = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getBestSellers();
    getNewArrivals();
  }, []);

  const getBestSellers = async () => {
    try {
      const response = await productService.getBestSellers();
      const { products } = response.data;
      setBestSellers(products);
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/error");
      } else {
        navigate("/404");
      }
    }
  };

  const getNewArrivals = async () => {
    try {
      const response = await productService.getNewArrivals();
      const { products } = response.data;
      setNewArrivals(products);
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
          {bestSellers && <ItemHorizonList products={bestSellers} />}
        </div>
      </section>

      <section className="mb-3">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>Hàng mới</h2>
            </div>
          </div>
          {newArrivals && <ItemHorizonList products={newArrivals} />}
        </div>
      </section>
    </>
  );
};

export default LandingBottom;
