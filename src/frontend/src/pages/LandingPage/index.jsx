import { React, useState, useEffect } from "react";
import LandingBottom from "components/LandingBottom";
import LandingTop from "components/LandingTop";

const LandingPage = (props) => {
  return (
    <>
      <LandingTop categoryList={props.categoryList} />
      <LandingBottom />
    </>
  );
};

export default LandingPage;
