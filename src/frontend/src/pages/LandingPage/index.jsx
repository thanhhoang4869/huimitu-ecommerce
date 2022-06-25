import React from "react";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import LandingBottom from "../../components/LandingBottom";
import LandingTop from "../../components/LandingTop";

const LandingPage = () => {
  return (
    <>
      <GoogleLoginButton />
      <LandingTop />
      <LandingBottom />
    </>
  );
};

export default LandingPage;
