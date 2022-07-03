import React from "react";
import CategoryBar from "./CategoryBar";
import SearchBar from "./SearchBar";
import Banner from "./Banner";
import { Route, Routes } from "react-router-dom";

const LandingTop = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <CategoryBar />
          <div className="col-lg-9">
            <SearchBar />
            <Routes>
              <Route exact path="/" element={<Banner />} />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingTop;
