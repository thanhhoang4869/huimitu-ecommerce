import React from "react";
import { useEffect } from "react";

const GoogleLoginButton = () => {
  const handleCallbackResponse = (response) => {
    const { credential } = response;
    window.localStorage.setItem("access-token", credential);
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.google) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id:
        "455931437831-ks5eehsjpcf4vkijm42ku12kcusa9ouj.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
  }, []);

  return (
    <>
      <div id="signInDiv"></div>
    </>
  );
};

export default GoogleLoginButton;
