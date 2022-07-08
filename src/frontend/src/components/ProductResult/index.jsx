import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ItemHorizonList from "components/ItemHorizonList";
import Paging from "components/Paging";
import Breadcrumb from "components/Breadcrumb";
import { useEffect } from "react";
import category from "services/category";

const ProductResult = () => {
  const location = useLocation();
  const [category, setCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");
  const categoryList = JSON.parse(localStorage.getItem("categoryList"));

  useEffect(() => {
    const categoryId = location.state.categoryId;
    for (let category in categoryList) {
      const children = categoryList[category].children;
      for (let child in children) {
        if (+children[child].id === +categoryId) {
          setCategory(JSON.stringify(categoryList[category]));
          setChildCategory(JSON.stringify(children[child]));
        }
      }
    }
  }, [location.state.categoryId]);

  return (
    <>
      {/* <Breadcrumb /> */}
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
    </>
  );
};

export default ProductResult;
