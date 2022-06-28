import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import account from "../../services/account";

const GoogleLoginButton = () => {
  const onSuccess = async (response) => {
    const { credential } = response;

    const result = await account.googleLogin(credential);
    const { exitcode, message, token } = result.data;
    if (exitcode === 0) {
      window.localStorage.setItem("token", token);
      alert("Login successfully");
    } else {
      alert(message)
    }
  };

  const onError = () => {
    console.log("Login by Google fail");
  };

  return <GoogleLogin onSuccess={onSuccess} onError={onError} />;
};

export default GoogleLoginButton;
