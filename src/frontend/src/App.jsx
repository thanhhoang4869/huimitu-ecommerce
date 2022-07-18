import React from "react";
import MainPage from "./pages/MainPage";
import config from "./config/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./App.less";
import { AuthProvider } from "context/AuthContext";

class App extends React.Component {
  render() {
    return (
      <>
        <AuthProvider>
          <PayPalScriptProvider
            options={{ "client-id": config.PAYPAL_CLIENT_ID }}
          >
            <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
              <MainPage />
            </GoogleOAuthProvider>
          </PayPalScriptProvider>
        </AuthProvider>
      </>
    );
  }
}

export default App;
