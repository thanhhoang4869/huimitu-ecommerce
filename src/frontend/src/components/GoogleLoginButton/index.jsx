import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import account from "../../services/account";

const GoogleLoginButton = () => {
  const onSuccess = async (response) => {
    const { credential } = response;
    const token = await account.googleLogin(credential);
    window.localStorage.setItem("token", token);
    console.log(token)
  };

  const onError = () => {
    console.log("Login by Google fail");
  };

  return <GoogleLogin onSuccess={onSuccess} onError={onError} />;
};

export default GoogleLoginButton;
