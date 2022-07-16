import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = (props) => {
  const { onSuccess, onError, ...rest } = props;

  return <GoogleLogin {...rest} onSuccess={onSuccess} onError={onError} />;
};

export default GoogleLoginButton;
