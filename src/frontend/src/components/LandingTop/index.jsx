import React from "react";
import CategoryBar from "./CategoryBar";
import SearchBar from "./SearchBar";
import Banner from "./Banner";
import { Route, Routes } from "react-router-dom";

const LandingTop = () => {
  return (
    <section class="hero">
      <div class="container">
        <div class="row">
          <CategoryBar />
          <div class="col-lg-9">
            <SearchBar />
            <Routes>
              <Route exact path="/" element={<Banner />} />
              <Route exact path="/*" element={<div>Test</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingTop;
