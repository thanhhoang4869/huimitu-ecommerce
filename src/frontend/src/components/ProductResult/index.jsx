import React from "react";
import ItemHorizonList from "components/ItemHorizonList";
import Paging from "components/Paging";

const ProductResult = () => {
  return (
    <section className="mb-3">
      <div className="container">
        <div className="row">
          <div className="section-title">
            <h4>Result</h4>
          </div>
        </div>
        <ItemHorizonList isResult={true} />
        <div style={{ textAlign: "end" }}>
          <Paging />
        </div>
      </div>
    </section>
  );
};

export default ProductResult;
