import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = (props) => {

  const onSuccess = props.handleGoogleSucces;
  const onError = props.handleGoogleError;

  return <GoogleLogin onSuccess={onSuccess} onError={onError} />;
};

export default GoogleLoginButton;
