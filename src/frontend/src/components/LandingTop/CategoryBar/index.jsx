import React from "react";

const CategoryBar = () => {
  return (
    <>
      <div className="col-lg-3">
        <div className="hero__categories">
          <div className="hero__categories__all">
            <i className="fa fa-bars"></i>
            <span>All departments</span>
          </div>
          <ul>
            <li>
              <a href="#">Fresh Meat</a>
            </li>
            <li>
              <a href="#">Vegetables</a>
            </li>
            <li>
              <a href="#">Fruit & Nut Gifts</a>
            </li>
            <li>
              <a href="#">Fresh Berries</a>
            </li>
            <li>
              <a href="#">Ocean Foods</a>
            </li>
            <li>
              <a href="#">Butter & Eggs</a>
            </li>
            <li>
              <a href="#">Fastfood</a>
            </li>
            <li>
              <a href="#">Fresh Onion</a>
            </li>
            <li>
              <a href="#">Papayaya & Crisps</a>
            </li>
            <li>
              <a href="#">Oatmeal</a>
            </li>
            <li>
              <a href="#">Fresh Bananas</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CategoryBar;
