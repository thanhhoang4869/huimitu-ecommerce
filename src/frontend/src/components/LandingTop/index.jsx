import React from "react";
import CategoryBar from "../CategoryBar";
import SearchBar from "../SearchBar";
import Banner from "../Banner";
import { Route, Routes } from "react-router-dom";
import ProductResult from "components/ProductResult";

const LandingTop = (props) => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <CategoryBar categoryList={props.categoryList} />
          <div className="col-lg-9">
            <SearchBar />
            <Routes>
              <Route exact path="/" element={<Banner />} />
              <Route path="/res" element={<ProductResult />} />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingTop;
