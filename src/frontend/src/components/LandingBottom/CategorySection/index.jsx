import React from "react";
import CategorySlider from "./CategorySlider";

const CategorySection = () => {
  return (
    <>
      <section className="categories">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>Category</h2>
            </div>
            <CategorySlider/>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategorySection;
