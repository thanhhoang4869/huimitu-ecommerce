import { React, useState, useEffect } from "react";
import LandingBottom from "components/LandingBottom";
import LandingTop from "components/LandingTop";
import category from "services/category";

const LandingPage = () => {
  const [categoryList, setCategoryList] = useState([]);

  const getCategoryList = async () => {
    const response = await category.getCategoryList();
    const data = response.data.categories;
    setCategoryList(data);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <>
      <LandingTop categoryList={categoryList} />
      <LandingBottom />
    </>
  );
};

export default LandingPage;
