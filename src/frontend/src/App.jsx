import React from "react";
import MainPage from "./pages/MainPage";
import config from "./config/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./App.less";
import { AccountProvider } from "context/AccountContext";

class App extends React.Component {
  render() {
    return (
      <>
        <AccountProvider>
          <PayPalScriptProvider
            options={{ "client-id": config.PAYPAL_CLIENT_ID }}
          >
            <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
              <MainPage />
            </GoogleOAuthProvider>
          </PayPalScriptProvider>
        </AccountProvider>
      </>
    );
  }
}

export default App;
