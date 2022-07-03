import React from "react";
import ItemHorizonList from "components/ItemHorizonList";

const LandingBottom = () => {
  return (
    <>
      <section className="mb-3">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>New Arrivals</h2>
            </div>
          </div>
          <ItemHorizonList />
        </div>
      </section>

      <section className="mb-5">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>Best sellers</h2>
            </div>
          </div>
          <ItemHorizonList />
        </div>
      </section>
    </>
  );
};

export default LandingBottom;
