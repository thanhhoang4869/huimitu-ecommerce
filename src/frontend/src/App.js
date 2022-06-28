import React from "react";
import MainPage from "./pages/MainPage";
import config from './config/config'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
console.log(config)

class App extends React.Component {
  render() {
    return (
      <>
        <PayPalScriptProvider options={{ "client-id": config.PAYPAL_CLIENT_ID }}>
          <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
            <MainPage />
          </GoogleOAuthProvider>;
        </PayPalScriptProvider>
      </>
    );
  }
}

export default App;
